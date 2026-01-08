import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/token";
import { User } from "../model/user.model";

export default async function reqAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(404).json({
      message: "You are not auth user. You cannot access it",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = await verifyAccessToken(token);

    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({
        message: "User does not exist",
      });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.status(401).json({
        message: "Token version invalid",
      });
    }

    const authReq = req as any;

    authReq.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Invalid server error",
      error: error,
    });
  }
}
