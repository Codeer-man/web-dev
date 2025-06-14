"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const neon_http_1 = require("drizzle-orm/neon-http");
const serverless_1 = require("@neondatabase/serverless");
const auth_sql_1 = require("../schema/auth.sql");
const sql = (0, serverless_1.neon)(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_ZJz32NQvcslf@ep-small-snow-a8df6lxj-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
exports.db = (0, neon_http_1.drizzle)(sql);
exports.db.insert(auth_sql_1.authTable).values({
    userName: "manandhar",
    email: "example@gmail.com",
    password: "manandhar",
});
