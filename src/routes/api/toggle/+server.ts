import { pool } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function PATCH ({ request }) {
  const body = await request.json();
  const res = await pool.query('UPDATE todo SET completed = NOT completed WHERE id = $1 RETURNING *', [body.id]);
  return json(res);
}