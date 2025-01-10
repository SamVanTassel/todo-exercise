import { drizzle as drizzlePG } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { neon } from "@neondatabase/serverless";
import pg from 'pg';

import {
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_NAME,
  NEON_DB_URL,
} from '$env/static/private';

let dbLocal;
let dbNeon;

// run on a local database in local development
if (import.meta.env.VITE_LOCAL === 'TRUE') {
  console.log('running local database');
  const client = new pg.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
  dbLocal = drizzlePG({ client, casing: 'snake_case' });
} else {
  console.log('running neon database');
  const sql = neon(NEON_DB_URL!);
  dbNeon = drizzleNeon({ client: sql, casing: 'snake_case' });
}

export const db = dbLocal ? dbLocal : dbNeon!;
 