import { db } from "$lib/server/db.server.js";
import { error, json } from "@sveltejs/kit";
import { todos } from "../../../../db/schema.js";
import { eq, not, sql } from "drizzle-orm";

export async function PATCH ({ params }) {
  const id = Number.parseInt(params.id);

  try {
  await db.update(todos)
    .set({
      completed: not(todos.completed),
      updated_at: sql`now()`,
    })
    .where(eq(todos.id, id));
  return json({ success: true });
  } catch (e) {
    console.error(e);
    return error(500);
  }
}