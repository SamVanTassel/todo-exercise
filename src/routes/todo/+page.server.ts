import { pool } from "$lib/server/db"

export const load = async ({ depends }) => {
  const res = await pool.query('SELECT * FROM todo');
  const data = res.rows;
  depends('todos-updated');
  return {
    todos: data,
  }
}

export const actions = {
  default: async ({ request }) => {
    const fd = await request.formData();
    const text = fd.get('text');
    await pool.query('INSERT INTO todo (text) VALUES ($1)', [text]);
    return { success: true };
  }
}