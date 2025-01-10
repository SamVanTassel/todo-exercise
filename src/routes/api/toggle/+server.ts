import { db } from "$lib/server/db.server.js";
import { json } from "@sveltejs/kit";
import { todo } from "../../../db/schema.js";
import { eq, not, sql } from "drizzle-orm";

export async function PATCH ({ request }) {
  const body = await request.json();

  const res = await db.update(todo)
    .set({
      completed: not(todo.completed),
      updated_at: sql`now()`,
    })
    .where(eq(todo.id, body.id));
  console.log(res);

  return json({ success: true });
}