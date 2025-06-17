import { timestamp } from "drizzle-orm/pg-core";


export const timeStamp = {
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    createdAt :timestamp("created_at").defaultNow().notNull()
}