    import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
    import { timestamps } from "../schema.helper";
    import { relations } from "drizzle-orm";
    import { postTable } from "./user.sql";

    export const roleEnum = pgEnum("roles",["admin","users"])

    export const authTable = pgTable("auth",{
        _id:integer("id").primaryKey().generatedAlwaysAsIdentity(),
        firstName : varchar("first_name").notNull(),
        lastName:varchar("last_name",{length:255}).notNull(),
        role: roleEnum().default("users"),
        ...timestamps
    })

    export const  authRelation = relations(authTable,({many}) => ({
        postTable: many(postTable)
    }))

    export const postRelatin = relations (postTable,({one}) => ({
        authTable: one(authTable,{
            fields: [postTable.userId],
            references: [authTable._id]
        })
    }))