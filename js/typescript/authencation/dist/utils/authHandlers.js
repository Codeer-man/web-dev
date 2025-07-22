"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user, session) => {
    const accessTokenSecret = process.env.JWT_ACCESS_TOKEN;
    const refreshTokenSecret = process.env.JWT_REFRESH_KEY;
    const forgetPasswordToken = process.env.JWT_FORGET_KEY;
    if (!accessTokenSecret || !refreshTokenSecret) {
        throw new Error("JWT secrets are not configured. Please check your environment variables.");
    }
    if (!forgetPasswordToken) {
        throw new Error("Forgot psw secret key not found");
    }
    const accessToken = jsonwebtoken_1.default.sign({ email: user.email, id: user.id }, accessTokenSecret, { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id, sessionId: session.id }, refreshTokenSecret, { expiresIn: "7d" });
    const forgetPassword = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, forgetPasswordToken, { expiresIn: "2h" });
    return { accessToken, refreshToken, forgetPassword };
};
exports.generateToken = generateToken;
