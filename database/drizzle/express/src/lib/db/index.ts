import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { authTable } from "../schema/auth.sql";
import { seed } from "drizzle-seed";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle({ client: sql });

// db.insert(authTable).values({
//     userName:"manandhar",
//     email:"example@gmail.com",
//     password:"manandhar",

// })

export async function main() {
  await seed(db, { authTable });
}
