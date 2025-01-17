import { db } from "$lib/server/db.server.js";
import { error, json } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";
import { todos } from "../../../../db/schema.js";

export async function DELETE ({ params }) {
  const id = Number.parseInt(params.id, 10);
  try {
    await db.update(todos)
      .set({ deleted_at: sql`now()` })
      .where(eq(todos.id, id));
    return json({ success: true });
  } catch (e) {
    console.error(e);
    return error(500);
  }
}