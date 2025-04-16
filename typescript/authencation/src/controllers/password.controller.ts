import { NextFunction, Request, Response } from "express";
import {
  compareEmailAndUsername,
  findUserById,
} from "../services/auth.services";
import { ErrorHandler } from "../utils/errorHandler";

import { sendForgetPasswordLink } from "../services/mail.services";


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
