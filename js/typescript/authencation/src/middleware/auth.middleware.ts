import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler";
import { findUserById } from "../services/auth.services";

interface JwtPayload {
  email: string;
  id: string;
}

interface AuthRequest extends Request {
  user?: any;
  id?: string;
  token?: string;
}

export const authmiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer", "").trim();

  if (!token) {
    return next(new ErrorHandler("Token not found", 401, false));
  }

  try {
    if (!process.env.JWT_ACCESS_TOKEN) {
      throw new ErrorHandler("Secret key is required", 500, false);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN
    ) as JwtPayload;

    if (!decoded) {
      throw new ErrorHandler("token not decodex", 500, false);
    }

    const user = await findUserById(decoded.id).select(
      "-password -refreshToken -emailVerified -otp"
    );

    if (!user) {
      throw new ErrorHandler("User not found", 404, false);
    }

    const authreq = req as AuthRequest;

    (req as any).user = user;
    (req as any).id = user._id.toString();
    (req as any).token = token;


    next();
  } catch (error) {
    next(error);
  }
};
