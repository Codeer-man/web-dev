import { Column, relations, sql } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  integer,
  interval,
  json,
  jsonb,
  numeric,
  pgTable,
  primaryKey,
  real,
  serial,
  smallint,
  time,
  varchar,
} from "drizzle-orm/pg-core";
import { authTable } from "./auth.sql";

export const int = pgTable("Post", {
  id: integer(),
  int1: integer().default(10),
  int2: integer().default(sql`'10'::int`),
});

// smallint  2bits
// bigint  8byte

//! SQL FORM
// CREATE TABLE IF NOT EXIST "posttable"(
//     "id" integer,
//     "int1" integer DEFAULT 10
//     "int2" integer DEFAULT'10'::int
// )

export const serialTable = pgTable("serial", {
  serial: serial(), //for auto increment //  serial
  numeric: numeric(), //for very large number of number ie 1239309
  numeric2: numeric({ precision: 100 }),
  numeric3: numeric({ precision: 100, scale: 20 }),
  numericNum: numeric({ mode: "number" }),
  numericBig: numeric({ mode: "bigint" }),
});

// smallserial and bigserial

//! sql form
// create table if not exist serial (
//     "serial" serial not null
// )

export const booleanTable = pgTable("Boolean", {
  boolean: boolean().default(false),
  float: real(), //floating number
  object: json("metadata"), //used as object can store unlimited kay nand value
  fixObject: json().$type<{
    url: string;
    publicId: string;
  }>(),
  binaryJson: jsonb(), //*  You need to query, filter, or index the JSON data.You want faster lookups and don't care about key order.
  jsonb: jsonb().$type<string[]>(),

  time1: time(),
  time2: time({ withTimezone: true }),
  time3: time({ precision: 6 }),
  time4: time({ precision: 6, withTimezone: true }),
  interval: interval({ fields: "minute" }),
});

const primary = pgTable(
  "primary",
  {
    id: serial(),
    username: varchar().notNull(),
  },
  (key) => ({
    pk: primaryKey({ columns: [key.id] }),
  })
);

const foreign = pgTable(
  "refrence",
  {
    id: integer().generatedAlwaysAsIdentity().primaryKey(),
    authorName: varchar().references(() => primary.username),
    authorId: integer().references(() => primary.id),
  },
  (key) => ({
    pk: primaryKey({ columns: [key.id] }),
  })
);

const relation = pgTable(
  "relation",
  {
    userId: integer().primaryKey().generatedAlwaysAsIdentity(),
    primaryId: integer().notNull(),
    foreignId: integer(),
  },
  (key) => ({
    fk: foreignKey({ columns: [key.primaryId], foreignColumns: [primary.id] }),
  })
);

//! RELATIONS

// one to one on a single column
export const userRelation = relations(authTable, ({ one }) => ({
  invitee: one(authTable, {
    fields: [authTable.invitedBy],
    references: [authTable.id],
  }),
}));

// one to one on a different table
// primary has one related relation row
export const primaryRelation = relations(primary, ({ one }) => ({
  relation: one(relation, {
    fields: [primary.id],
    references: [relation.primaryId],
  }),
}));

// relation belongs to one primary
export const relationRelation = relations(relation, ({ one }) => ({
  primary: one(primary, {
    fields: [relation.primaryId],
    references: [primary.id],
  }),
}));
