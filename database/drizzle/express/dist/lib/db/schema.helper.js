"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeStamp = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.timeStamp = {
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull()
};
