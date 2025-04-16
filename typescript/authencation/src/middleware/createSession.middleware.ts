// middleware/session.middleware.ts
import { Request, Response, NextFunction } from "express";
import Session from "../models/session"
export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user; // Set in login controller
    const userAgent = req.headers["user-agent"] || "unknown";

    const session = await Session.create({
      userId: user._id,
      userAgent,
    });

    res.locals.sessionId = session._id;
    next();
  } catch (err) {
    next(err);
  }
};
