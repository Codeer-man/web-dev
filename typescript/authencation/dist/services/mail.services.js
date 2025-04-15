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
exports.sendverificationMail = sendverificationMail;
exports.sendForgetPasswordLink = sendForgetPasswordLink;
const mailHandler_1 = require("../utils/mailHandler");
const authHandlers_1 = require("../utils/authHandlers");
function sendverificationMail(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const verificationLink = `http://localhost:5173/verify-otp?userid=${newUser._id}`;
        const verificationOtp = Math.floor(100000 + Math.random() * 900000);
        // verification email
        const MailOptions = {
            from: `"Google baba" <${process.env.SMTP_USER}>`,
            subject: "Welcome to the code",
            text: `Your email ${newUser.email} has been created. Your OTP is ${verificationOtp}`,
            html: `<p>Your OTP is <strong>${verificationOtp}</strong></p>
           <p>Verify by clicking this <a href="${verificationLink}">link</a></p>`,
        };
        yield mailHandler_1.transporter.sendMail(MailOptions);
        return verificationOtp;
    });
}
function sendForgetPasswordLink(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const { forgetPassword } = (0, authHandlers_1.generateToken)({
            id: user._id.toString(),
            email: user.email,
        });
        const verificationLink = `http://localhost:5173/reset-password?token=${forgetPassword}`;
        // verification email
        const MailOptions = {
            from: `"Google baba" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Reset password",
            // text: `To reset the password of ${user.email} the token is  ${forgetPassword}`,
            html: `<p>To reset the password of ${user.email}</strong></p>
           <p>Click the link <a href="${verificationLink}">link</a></p>`,
        };
        yield mailHandler_1.transporter.sendMail(MailOptions);
        return forgetPassword;
    });
}
