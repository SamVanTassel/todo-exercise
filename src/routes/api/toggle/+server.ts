import { pool } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function POST ({ request }) {
  const body = await request.json();
  console.log('toggling', body);
  const res = await pool.query('UPDATE todo SET completed = NOT completed WHERE id = $1', [body.id]);
  console.log(res);
  return json(res);
}