import { db } from "$lib/server/db.server.js";
import { error, json } from "@sveltejs/kit";
import { todos } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";

export async function PATCH ({ request, params }) {
  const id = Number.parseInt(params.id, 10);
  const { text } = await request.json();

  try {
    await db
      .update(todos)
      .set({ text })
      .where(eq(todos.id, id));
    return json({ success: true });
  } catch (e) {
    console.error(e);
    return error(500);
  }
}