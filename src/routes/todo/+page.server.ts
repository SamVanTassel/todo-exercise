import { pool } from "$lib/server/db"

export const load = async () => {
  const res = await pool.query('SELECT * FROM todo');
  const data = res.rows;
  return {
    data
  }
}

export const actions = {
  default: async ({ request }) => {
    const fd = await request.formData();
    const text = fd.get('text');
    await pool.query('INSERT INTO todo (text) VALUES ($1)', [text])
  }
}