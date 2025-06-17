import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../schema.helper";

export const roleEnum = pgEnum("roles",["admin","users"])

export const authTable = pgTable("auth",{
    _id:integer("id").primaryKey().generatedAlwaysAsIdentity(),
    firstName : varchar("first_name").notNull(),
    lastName:varchar("last_name",{length:255}).notNull(),
    role: roleEnum().default("users"),
    ...timestamps
})