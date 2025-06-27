import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./schema";
import { relations } from "drizzle-orm";

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("create_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const assets = pgTable("assets", {
  id: uuid().primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  thumnail: text("thumnail_url").notNull(),
  publicId: text("public_id").notNull(),
  isAppreoved: text("is_approved").notNull().default("pending"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  categoryId: integer("category_id")
    .notNull()
    .references(() => category.id),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const categoryRelation = relations(category, ({ many }) => ({
  assets: many(assets),
}));

export const assetRelation = relations(assets, ({ one, many }) => ({
  user: one(user, {
    fields: [assets.userId],
    references: [user.id],
  }),
  category: one(category, {
    fields: [assets.categoryId],
    references: [category.id],
  }),
}));
