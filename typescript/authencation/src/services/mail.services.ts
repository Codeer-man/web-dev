import { Types } from "mongoose";
import { transporter } from "../utils/mailHandler";
import { generateToken } from "../utils/authHandlers";

interface UserData {
  email: string;
  _id: Types.ObjectId;
}

export async function sendverificationMail(newUser: UserData): Promise<number> {
  const verificationLink = `http://localhost:5173/verify-otp?userid=${newUser._id}`;
  const verificationOtp: number = Math.floor(100000 + Math.random() * 900000);
  // verification email
  const MailOptions = {
    from: `"Google baba" <${process.env.SMTP_USER}>`,
    subject: "Welcome to the code",
    text: `Your email ${newUser.email} has been created. Your OTP is ${verificationOtp}`,
    html: `<p>Your OTP is <strong>${verificationOtp}</strong></p>
           <p>Verify by clicking this <a href="${verificationLink}">link</a></p>`,
  };

  await transporter.sendMail(MailOptions);
  return verificationOtp;
}

export async function sendForgetPasswordLink(user: UserData): Promise<string> {
  const { forgetPassword } = generateToken({
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

  await transporter.sendMail(MailOptions);
  return forgetPassword
}
