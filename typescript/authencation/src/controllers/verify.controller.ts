import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { ErrorHandler } from "../utils/errorHandler";
import { sendverificationMail } from "../services/mail.services";
import { findUserById } from "../services/auth.services";

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;

    const user = await findUserById(id);

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

// export const resendOtp = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { userId } = req.body;

//     const user = await User.findById(userId);

//     if (!user) {
//       throw new ErrorHandler("User not found", 404, false);
//     }

//     const newOtp = Math.floor(100000 + Math.random() * 900000);
//     user.otp = newOtp;
//     await user.save();

//     await sendverificationMail(user);

//     res.status(200).json({
//       success: true,
//       message: "OTP resent to your email",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
