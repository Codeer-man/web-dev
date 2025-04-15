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
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPassword = exports.verifyEmail = void 0;
const auth_services_1 = require("../services/auth.services");
const errorHandler_1 = require("../utils/errorHandler");
const mail_services_1 = require("../services/mail.services");
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, userId } = req.body;
        const user = yield (0, auth_services_1.findUserById)(userId);
        if (!user) {
            throw new errorHandler_1.ErrorHandler("User not found", 404, false);
        }
        if (user.otp !== otp) {
            throw new errorHandler_1.ErrorHandler("OTP does not match", 400, false);
        }
        yield user.updateOne({ emailVerified: true });
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyEmail = verifyEmail;
const forgetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email } = req.body;
        const user = yield (0, auth_services_1.compareEmailAndUsername)(username, email);
        if (!user) {
            throw new errorHandler_1.ErrorHandler("Username or email not found", 401, false);
        }
        const verificationOtp = yield (0, mail_services_1.sendForgetPasswordLink)(user);
        res.status(201).json({
            sucess: true,
            message: "Link has been sent",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.forgetPassword = forgetPassword;
