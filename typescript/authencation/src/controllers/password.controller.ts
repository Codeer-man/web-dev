import { NextFunction, Request, Response } from "express";
import {
  compareEmailAndUsername,
  findUserById,
} from "../services/auth.services";
import { ErrorHandler } from "../utils/errorHandler";

import { sendForgetPasswordLink } from "../services/mail.services";

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp, userId } = req.body;

    const user = await findUserById(userId);

    if (!user) {
      throw new ErrorHandler("User not found", 404, false);
    }

    if (user.otp !== otp) {
      throw new ErrorHandler("OTP does not match", 400, false);
    }

    await user.updateOne({ emailVerified: true });

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email } = req.body;

    const user = await compareEmailAndUsername(username, email);

    if (!user) {
      throw new ErrorHandler("Username or email not found", 401, false);
    }

    const verificationOtp = await sendForgetPasswordLink(user);

    res.status(201).json({
      sucess: true,
      message: "Link has been sent",
    });
  } catch (error) {
    next(error);
  }
};
