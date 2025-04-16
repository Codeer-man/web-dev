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
        if (!newUser.email) {
            throw new Error("Recipient email is required");
        }
        const verificationOtp = Math.floor(100000 + Math.random() * 900000);
        const verificationLink = `${process.env.FRONTEND_URL}/verify-otp?userid=${newUser._id}`;
        const mailOptions = {
            from: `"Google baba" <${process.env.SMTP_USER}>`,
            to: newUser.email, // Added recipient
            subject: "Welcome to the code",
            text: `Your email ${newUser.email} has been created. Your OTP is ${verificationOtp}`,
            html: `
      <div>
        <p>Hello ${newUser.username || "User"},</p>
        <p>Your OTP is <strong>${verificationOtp}</strong></p>
        <p>Verify by clicking this <a href="${verificationLink}">link</a></p>
        <p>OTP will expire in 15 minutes.</p>
      </div>
    `,
        };
        try {
            yield mailHandler_1.transporter.sendMail(mailOptions);
            return verificationOtp;
        }
        catch (error) {
            console.error("Failed to send verification email:", error);
            throw new Error("Failed to send verification email");
        }
    });
}
function sendForgetPasswordLink(user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user.email) {
            throw new Error("Recipient email is required");
        }
        const { forgetPassword } = (0, authHandlers_1.generateToken)({
            id: user._id.toString(),
            email: user.email,
        });
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${forgetPassword}`;
        const mailOptions = {
            from: `"Google baba" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Password Reset Request",
            html: `
      <div>
        <p>Hello ${user.username || "User"},</p>
        <p>We received a request to reset your password.</p>
        <p>Click the link below to proceed:</p>
        <p><a href="${resetLink}">Reset Password</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
        };
        try {
            yield mailHandler_1.transporter.sendMail(mailOptions);
            return forgetPassword;
        }
        catch (error) {
            console.error("Failed to send password reset email:", error);
            throw new Error("Failed to send password reset email");
        }
    });
}
