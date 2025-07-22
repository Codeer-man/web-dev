import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema/auth-schema";

const sql = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(sql, { schema });
