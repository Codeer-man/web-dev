import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { logger } from "../logger/logger";

const sql = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(sql, {
  casing: "snake_case",
});

export async function connectTodb() {
  const result = await db.execute("select 1");

  if (result.rows?.length > 0) {
    logger.info("Connected to db");
    console.log("connected to db");

    return result.rows[0]["?column?"] ?? Object.values(result.rows[0])[0];
  }
  return logger.error("something wrong");
}

export async function getClient() {
  const client = await sql.connect();
  return client;
}
