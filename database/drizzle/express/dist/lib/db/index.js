"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.main = main;
require("dotenv/config");
const neon_http_1 = require("drizzle-orm/neon-http");
const serverless_1 = require("@neondatabase/serverless");
const auth_sql_1 = require("../schema/auth.sql");
const drizzle_seed_1 = require("drizzle-seed");
const sql = (0, serverless_1.neon)(process.env.DATABASE_URL);
exports.db = (0, neon_http_1.drizzle)(sql);
// db.insert(authTable).values({
//     userName:"manandhar",
//     email:"example@gmail.com",
//     password:"manandhar",
// })
async function main() {
    await (0, drizzle_seed_1.seed)(exports.db, { authTable: auth_sql_1.authTable });
}
