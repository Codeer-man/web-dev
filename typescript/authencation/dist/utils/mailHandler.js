"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
};
exports.transporter = nodemailer_1.default.createTransport(mailConfig);
// Verify connection configuration
exports.transporter.verify(function (error, success) {
    if (error) {
        console.log("SMTP connection error:", error);
    }
    else {
        console.log("Server is ready to take our messages");
    }
});
