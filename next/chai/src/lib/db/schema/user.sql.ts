import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../schema.helper";

export const userTable = pgTable("User", {
  id: uuid("_id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  ...timestamps,
});
