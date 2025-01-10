import { db } from "$lib/server/db.server.js";
import { json } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";
import { todo } from "../../../db/schema.js";

export async function DELETE ({ request }) {
  const body = await request.json();
  console.log('deleting', body.id);
  await db.update(todo)
    .set({ deleted_at: sql`now()` })
    .where(eq(todo.id, body.id));
  return json({ success: true });
}