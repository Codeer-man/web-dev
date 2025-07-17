"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationRelation = exports.primaryRelation = exports.userRelation = exports.booleanTable = exports.serialTable = exports.int = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const auth_sql_1 = require("./auth.sql");
exports.int = (0, pg_core_1.pgTable)("Post", {
    id: (0, pg_core_1.integer)(),
    int1: (0, pg_core_1.integer)().default(10),
    int2: (0, pg_core_1.integer)().default((0, drizzle_orm_1.sql) `'10'::int`),
});
// smallint  2bits
// bigint  8byte
//! SQL FORM
// CREATE TABLE IF NOT EXIST "posttable"(
//     "id" integer,
//     "int1" integer DEFAULT 10
//     "int2" integer DEFAULT'10'::int
// )
exports.serialTable = (0, pg_core_1.pgTable)("serial", {
    serial: (0, pg_core_1.serial)(), //for auto increment //  serial
    numeric: (0, pg_core_1.numeric)(), //for very large number of number ie 1239309
    numeric2: (0, pg_core_1.numeric)({ precision: 100 }),
    numeric3: (0, pg_core_1.numeric)({ precision: 100, scale: 20 }),
    numericNum: (0, pg_core_1.numeric)({ mode: "number" }),
    numericBig: (0, pg_core_1.numeric)({ mode: "bigint" }),
});
// smallserial and bigserial
//! sql form
// create table if not exist serial (
//     "serial" serial not null
// )
exports.booleanTable = (0, pg_core_1.pgTable)("Boolean", {
    boolean: (0, pg_core_1.boolean)().default(false),
    float: (0, pg_core_1.real)(), //floating number
    object: (0, pg_core_1.json)("metadata"), //used as object can store unlimited kay nand value
    fixObject: (0, pg_core_1.json)().$type(),
    binaryJson: (0, pg_core_1.jsonb)(), //*  You need to query, filter, or index the JSON data.You want faster lookups and don't care about key order.
    jsonb: (0, pg_core_1.jsonb)().$type(),
    time1: (0, pg_core_1.time)(),
    time2: (0, pg_core_1.time)({ withTimezone: true }),
    time3: (0, pg_core_1.time)({ precision: 6 }),
    time4: (0, pg_core_1.time)({ precision: 6, withTimezone: true }),
    interval: (0, pg_core_1.interval)({ fields: "minute" }),
});
const primary = (0, pg_core_1.pgTable)("primary", {
    id: (0, pg_core_1.serial)(),
    username: (0, pg_core_1.varchar)().notNull(),
}, (key) => ({
    pk: (0, pg_core_1.primaryKey)({ columns: [key.id] }),
}));
const foreign = (0, pg_core_1.pgTable)("refrence", {
    id: (0, pg_core_1.integer)().generatedAlwaysAsIdentity().primaryKey(),
    authorName: (0, pg_core_1.varchar)().references(() => primary.username),
    authorId: (0, pg_core_1.integer)().references(() => primary.id),
}, (key) => ({
    pk: (0, pg_core_1.primaryKey)({ columns: [key.id] }),
}));
const relation = (0, pg_core_1.pgTable)("relation", {
    userId: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    primaryId: (0, pg_core_1.integer)().notNull(),
    foreignId: (0, pg_core_1.integer)(),
}, (key) => ({
    fk: (0, pg_core_1.foreignKey)({ columns: [key.primaryId], foreignColumns: [primary.id] }),
}));
//! RELATIONS
// one to one on a single column
exports.userRelation = (0, drizzle_orm_1.relations)(auth_sql_1.authTable, ({ one }) => ({
    invitee: one(auth_sql_1.authTable, {
        fields: [auth_sql_1.authTable.invitedBy],
        references: [auth_sql_1.authTable.id],
    }),
}));
// one to one on a different table
// primary has one related relation row
exports.primaryRelation = (0, drizzle_orm_1.relations)(primary, ({ one }) => ({
    relation: one(relation, {
        fields: [primary.id],
        references: [relation.primaryId],
    }),
}));
// relation belongs to one primary
exports.relationRelation = (0, drizzle_orm_1.relations)(relation, ({ one }) => ({
    primary: one(primary, {
        fields: [relation.primaryId],
        references: [primary.id],
    }),
}));
