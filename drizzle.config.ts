import { defineConfig } from "drizzle-kit";
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const DB_URL = process.env.VITE_LOCAL === 'TRUE' ?
  process.env.LOCAL_DB_URL as string : process.env.NEON_DB_URL as string;

  console.log(DB_URL);
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: DB_URL,
  },
});
