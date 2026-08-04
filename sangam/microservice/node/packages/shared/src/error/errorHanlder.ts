import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";

export function errorHanlder(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  //logger error

  return res.status(500).json({
    success: false,
    message: " Internal server error",
  });
}
