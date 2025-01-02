import { pool } from '$lib/server/db';

export const load = async () => {
  const res = await pool.query('SELECT NOW()');
  const dbDate = res.rows[0].now;
  console.log(dbDate);
  const serverDate = new Date().toString();
  return {
    data: {
      dbDate,
      serverDate,
    }
  }
}