import { db } from "$lib/server/db.server"
import { and, eq, isNull } from "drizzle-orm";
import { todos } from "../db/schema";
import { error, redirect } from "@sveltejs/kit";

export const load = async ({ depends, locals }) => {
  const session = await locals.auth();
  if (!session) return;
  const userId = session.user.id;
  
  depends('todos-updated');

  try {
    const res = await db.select()
      .from(todos)
      .where(
        and(
          eq(todos.ownerId, userId),
          isNull(todos.deleted_at)))
      .orderBy(todos.updated_at);
    const data = res;
    return {
      todos: data,
    }
  } catch (e) {
    console.error(e);
    return error(500);
  }
}

export const actions = {
  default: async ({ request, locals }) => {
    const session = await locals.auth();
    if (!session) return redirect(303, '/signin');
    const userId = session.user.id;

    const fd = await request.formData();
    const text = fd.get('text') as string;

    try {
      await db.insert(todos).values({
        text,
        ownerId: userId,
      });
      return { success: true };
    } catch (e) {
      console.error(e);
      return error(500);
    }
  }
}