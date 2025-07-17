"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.character = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.character = (0, pg_core_1.pgTable)("Character", {
    text: (0, pg_core_1.text)(), // text has unlimited character length
    varchar: (0, pg_core_1.varchar)({ length: 256 })
});
// create table if not exists text(
//     text text
// varchar varchar(256)
// )
