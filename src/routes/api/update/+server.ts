import { db } from "$lib/server/db.server.js";
import { json } from "@sveltejs/kit";
import { todo } from "../../../db/schema.js";
import { eq } from "drizzle-orm";

export async function PATCH ({ request }) {
  const { id, text} = await request.json();
  console.log('updating', id, text);
  await db
    .update(todo)
    .set({ text })
    .where(eq(todo.id, id))
  return json({ success: true });
}