import {integer, pgSchema, pgTable, varchar} from "drizzle-orm/pg-core"
import {timestamps} from "../schema.helper"
import { authTable } from "./auth.sql"

export const userTable = pgTable("Users",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({length:255}).notNull(),
    email: varchar({length:255}).unique().notNull(),
    age: integer().notNull(),
    userId: integer("user_id").references(() => authTable._id),
    ...timestamps
})
