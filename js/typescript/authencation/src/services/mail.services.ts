import { Types } from "mongoose";
import { transporter } from "../utils/mailHandler";
import { generateToken } from "../utils/authHandlers";

interface UserData {
  email: string;
  _id: Types.ObjectId;
  username?: string; 
}

export async function sendverificationMail(newUser: UserData): Promise<number> {
  if (!newUser.email) {
    throw new Error("Recipient email is required");
  }

  const verificationOtp: number = Math.floor(100000 + Math.random() * 900000);
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
    await transporter.sendMail(mailOptions);
    return verificationOtp;
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
}

export async function sendForgetPasswordLink(user: UserData): Promise<string> {
  if (!user.email) {
    throw new Error("Recipient email is required");
  }

  const { forgetPassword } = generateToken({
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
    await transporter.sendMail(mailOptions);
    return forgetPassword;
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
}
