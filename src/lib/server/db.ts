import pg from 'pg';

const { Pool } = pg;
export const pool = new Pool({
  host: import.meta.env.VITE_DB_HOST,
  user: import.meta.env.VITE_DB_USER,
  password: import.meta.env.VITE_DB_PASSWORD,
  database: import.meta.env.VITE_DB_DB,
});
