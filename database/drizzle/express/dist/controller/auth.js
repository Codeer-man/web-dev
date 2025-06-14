"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.update = exports.insert = void 0;
const db_1 = require("../lib/db");
const auth_sql_1 = require("../lib/schema/auth.sql");
const drizzle_orm_1 = require("drizzle-orm");
const insert = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const data = await db_1.db.insert(auth_sql_1.authTable).values({
            userName: username, // Make sure this matches your schema!
            email,
            password,
        });
        console.log("Insert result:", data);
        res.json({ success: true, data });
    }
    catch (error) {
        console.error("Insert failed:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.insert = insert;
const update = async (req, res) => {
    try {
        const { email } = req.body;
        const data = await db_1.db
            .update(auth_sql_1.authTable)
            .set({ email: email })
            .where((0, drizzle_orm_1.eq)(auth_sql_1.authTable.id, 1));
        console.log("Insert result:", data);
        res.json({ success: true, data });
    }
    catch (error) {
        console.error("Insert failed:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.update = update;
const del = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await db_1.db
            .delete(auth_sql_1.authTable).where((0, drizzle_orm_1.eq)(auth_sql_1.authTable.id, id));
        res.json({ success: true, data });
    }
    catch (error) {
        console.error("Insert failed:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.del = del;
