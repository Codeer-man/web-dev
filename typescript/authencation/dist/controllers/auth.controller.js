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
exports.authLogin = exports.authRegister = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_services_1 = __importDefault(require("../services/auth.services"));
const authHandlers_1 = require("../utils/authHandlers");
const errorHandler_1 = require("../utils/errorHandler");
const authRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new errorHandler_1.ErrorHandler("All fields are required", 400, true);
        }
        const userExist = yield (0, auth_services_1.default)(username, email);
        if (userExist) {
            throw new errorHandler_1.ErrorHandler("Username or email already exists", 400, false);
        }
        const newUser = new user_model_1.default({ username, email, password });
        yield newUser.save();
        res.status(201).json({
            sucess: true,
            message: "New user has been created",
            data: newUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.authRegister = authRegister;
const authLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const user = yield (0, auth_services_1.default)(username, email);
        if (!user) {
            throw new errorHandler_1.ErrorHandler("Username or email not found", 401, false);
        }
        const correctPassword = yield user.comparePassword(password);
        if (!correctPassword) {
            throw new errorHandler_1.ErrorHandler("Password doesnot match", 500, false);
        }
        const { accessToken, refreshToken } = (0, authHandlers_1.generateToken)({
            id: user._id.toString(),
            email: user.email,
        });
        user.refreshToken = refreshToken;
        yield user.save();
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
        });
        console.log(user, accessToken);
        res.status(201).json({
            sucess: true,
            message: "User logged In",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.authLogin = authLogin;
