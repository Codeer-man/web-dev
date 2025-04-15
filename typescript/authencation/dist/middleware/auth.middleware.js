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
exports.authmiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../utils/errorHandler");
const auth_services_1 = require("../services/auth.services");
const authmiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) ||
        ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer", "").trim());
    if (!token) {
        return next(new errorHandler_1.ErrorHandler("Token not found", 401, false));
    }
    try {
        if (!process.env.JWT_ACCESS_TOKEN) {
            throw new errorHandler_1.ErrorHandler("Secret key is required", 500, false);
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_TOKEN);
        if (!decoded) {
            throw new errorHandler_1.ErrorHandler("token not decodex", 500, false);
        }
        const user = yield (0, auth_services_1.findUserById)(decoded.id).select("-password -refreshToken -emailVerified -otp");
        if (!user) {
            throw new errorHandler_1.ErrorHandler("User not found", 404, false);
        }
        const authreq = req;
        req.user = user;
        req.id = user._id.toString();
        req.token = token;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.authmiddleware = authmiddleware;
