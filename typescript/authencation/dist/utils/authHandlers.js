"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    const accessTokenSecret = process.env.JWT_ACCESS_TOKEN;
    const refreshTokenSecret = process.env.JWT_REFRESH_KEY;
    if (!accessTokenSecret || !refreshTokenSecret) {
        throw new Error("JWT secrets are not configured. Please check your environment variables.");
    }
    const accessToken = jsonwebtoken_1.default.sign({ email: user.email, id: user.id }, accessTokenSecret, { expiresIn: "1h" });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, refreshTokenSecret, {
        expiresIn: "7d",
    });
    return { accessToken, refreshToken };
};
exports.generateToken = generateToken;
