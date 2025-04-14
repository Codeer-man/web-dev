"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { authRegister, authLogin } = require("../controllers/auth.controller");
const router = express_1.default.Router();
// Register route
router.post("/register", authRegister);
// Add other routes below as needed
router.post("/login", authLogin);
// router.post("/logout", authLogout);
exports.default = router;
