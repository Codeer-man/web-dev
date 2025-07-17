import {integer, pgSchema, pgTable, text, uuid, varchar} from "drizzle-orm/pg-core"
import {timestamps} from "../schema.helper"
import { authTable } from "./auth.sql"
import { relations } from "drizzle-orm"

export const postTable = pgTable("Users",{
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    userId: integer("user_id").references(() => authTable._id),
    ...timestamps
})
