"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const schema_helper_1 = require("../db/schema.helper");
exports.authTable = (0, pg_core_1.pgTable)("Auth", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    userName: (0, pg_core_1.varchar)("User_name", { length: 255 }).unique().notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull(),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    ...schema_helper_1.timeStamp
});
