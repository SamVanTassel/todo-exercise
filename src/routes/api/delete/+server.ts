import { pool } from "$lib/server/db";
import { json } from "@sveltejs/kit";

export async function DELETE ({ request }) {
  const body = await request.json();
  console.log('deleting', body.id);
  const res = await pool.query('DELETE FROM todo WHERE id = $1 RETURNING id', [body.id]);
  return json(res);
}