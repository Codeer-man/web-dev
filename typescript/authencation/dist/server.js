"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./utils/db"));
const index_1 = require("./routes/index");
const error_middleware_1 = require("./middleware/error.middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.default)();
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", index_1.authRoutes);
app.use(error_middleware_1.errorHandler);
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server running in ${PORT}`);
});
