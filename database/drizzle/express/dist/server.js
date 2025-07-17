"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./lib/db");
const auth_1 = require("./controller/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.post("/insert", auth_1.insert);
app.put("/update", auth_1.update);
app.delete("/delete", auth_1.del);
(0, db_1.main)().then((data) => {
    console.log(data);
}).catch((err) => {
    console.error(err);
});
app.listen(PORT, () => {
    console.log("server running in 3000");
});
