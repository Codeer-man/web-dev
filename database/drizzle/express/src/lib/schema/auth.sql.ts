import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import {timeStamp} from "../db/schema.helper"


export const authTable = pgTable("Auth",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    userName:varchar("User_name",{length:255}).unique().notNull(),
    email:varchar("email",{length:255}).notNull(),
    password:varchar("password",{length:255}).notNull(),
    invitedBy:integer("invited_by"),
    ...timeStamp
})

