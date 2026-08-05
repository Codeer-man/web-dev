import { config } from "dotenv";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import { closePool, getPool } from "../packages/shared/src/db/pool";

config({ path: resolve(process.cwd(), ".env") });

async function main() {
  const file = process.argv[2] ?? "sql/01_user.sql";
  const sql = readFileSync(resolve(process.cwd(), file), "utf-8");

  const pool = getPool();
  await pool.query(sql);
  console.log(`Migration: ${file}`);

  await closePool();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
