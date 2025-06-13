import {
  integer,
  varchar,
  pgTable,
  text,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { timestamps } from "../schema.helper";

export const video_Dimension = {
  height: 1080,
  width: 1920,
} as const;

export const videoTable = pgTable("Video", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  videoUrl: varchar("video_url", { length: 256 }).notNull(),
  thumnailUrl: varchar("thumnail_url", { length: 256 }).notNull(),
  controls: boolean().default(true),
  transformation: jsonb().default({
    height: integer().default(video_Dimension.height),
    width: integer().default(video_Dimension.width),
  }),
  ...timestamps,
});
