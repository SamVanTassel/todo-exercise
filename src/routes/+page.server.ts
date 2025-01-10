import { db } from "$lib/server/db.server"
import { and, eq, isNull } from "drizzle-orm";
import { todo } from "../db/schema";
import { redirect } from "@sveltejs/kit";

export const load = async ({ depends, locals }) => {
  const session = await locals.auth();
  if (!session) return redirect(303, '/signin');
  const userId = session.user.id;

  const res = await db.select()
    .from(todo)
    .where(
      and(
        eq(todo.ownerId, userId),
        isNull(todo.deleted_at)))
    .orderBy(todo.updated_at);
  const data = res;
  depends('todos-updated');
  return {
    todos: data,
  }
}

export const actions = {
  default: async ({ request, locals }) => {
    const session = await locals.auth();
    if (!session) return redirect(303, '/signin');
    const userId = session.user.id;

    const fd = await request.formData();
    const text = fd.get('text') as string;

    await db.insert(todo).values({
      text,
      ownerId: userId,
    })
    return { success: true };
  }
}