import "dotenv/config"
import {drizzle} from "drizzle-orm/neon-http"
import {neon} from "@neondatabase/serverless"
import { authTable } from "../schema/auth.sql"

const sql = neon( process.env.DATABASE_URL!)

export const db = drizzle(sql)

db.insert(authTable).values({
    userName:"manandhar",
    email:"example@gmail.com",
    password:"manandhar",

})