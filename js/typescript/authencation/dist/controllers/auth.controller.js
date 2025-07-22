"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.authLogin = exports.authRegister = exports.getUserById = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_services_1 = require("../services/auth.services");
const authHandlers_1 = require("../utils/authHandlers");
const errorHandler_1 = require("../utils/errorHandler");
const mail_services_1 = require("../services/mail.services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const session_1 = __importDefault(require("../models/session"));
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = req.user;
        if (!User) {
            throw new errorHandler_1.ErrorHandler("User not found in the controller ", 401, false);
        }
        console.log(User);
        res.status(200).json({ sucess: false, message: "User found", data: User });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const authRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new errorHandler_1.ErrorHandler("All fields are required", 400, true);
        }
        const userExist = yield (0, auth_services_1.compareEmailAndUsername)(username, email);
        if (userExist) {
            throw new errorHandler_1.ErrorHandler("Username or email already exists", 400, false);
        }
        const newUser = new user_model_1.default({ username, email, password });
        yield newUser.save();
        try {
            // Send verification email
            const verificationOtp = yield (0, mail_services_1.sendverificationMail)(newUser);
            newUser.otp = verificationOtp;
            yield newUser.save();
            res.status(201).json({
                success: true,
                message: "Registration successful. Check your email for verification.",
                data: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                },
            });
        }
        catch (emailError) {
            yield user_model_1.default.deleteOne({ _id: newUser._id });
            throw new errorHandler_1.ErrorHandler("Failed to send verification email", 500, false);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.authRegister = authRegister;
const authLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const user = yield (0, auth_services_1.compareEmailAndUsername)(username, email);
        if (!user)
            throw new errorHandler_1.ErrorHandler("Username or email not found", 401, false);
        const correctPassword = yield user.comparePassword(password);
        if (!correctPassword)
            throw new errorHandler_1.ErrorHandler("Password does not match", 401, false);
        // Create session
        const session = yield session_1.default.create({
            userId: user._id,
            userAgent: req.headers["user-agent"],
        });
        const { accessToken, refreshToken } = (0, authHandlers_1.generateToken)({ id: user._id.toString(), email: user.email }, { id: session.id.toString() });
        user.refreshToken = refreshToken;
        yield user.save();
        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
        res.status(200).json({
            success: true,
            message: "User logged in",
            data: user,
            accessToken: accessToken,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.authLogin = authLogin;
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if (!refreshToken) {
            throw new errorHandler_1.ErrorHandler("Refresh token not found in cookies or body", 404, false);
        }
        if (!process.env.JWT_REFRESH_KEY) {
            throw new errorHandler_1.ErrorHandler("JWT secret keys are not set", 500, false);
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_KEY);
        if (!decoded) {
            throw new errorHandler_1.ErrorHandler("Invalid token", 404, false);
        }
        console.log("Verified token", decoded);
        const findUser = yield user_model_1.default.findById(decoded.id);
        if (!findUser) {
            throw new errorHandler_1.ErrorHandler("User not found", 404, false);
        }
        else if ((findUser === null || findUser === void 0 ? void 0 : findUser.refreshToken) !== refreshToken) {
            throw new errorHandler_1.ErrorHandler("Token not matched", 401, false);
        }
        const { accessToken } = (0, authHandlers_1.generateToken)({
            id: findUser._id.toString(),
            email: findUser.email,
        }, { id: sessionStorage.userId.toString() });
        const options = {
            httponly: true,
            secure: true,
            maxAge: 15 * 60 * 1000,
        };
        res.clearCookie("accessToken", options);
        res.status(200).cookie("accessToken", accessToken, options).json({
            success: true,
            message: "Access token refreshed successfully",
            accessToken: accessToken,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.refreshToken = refreshToken;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new errorHandler_1.ErrorHandler("Refresh token not found", 400, false);
        }
        // Decode token to get sessionId
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_KEY);
        // Delete the session from the database
        yield session_1.default.findByIdAndDelete(decoded.sessionId);
        // Clear cookies
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
