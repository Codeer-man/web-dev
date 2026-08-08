import type { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError";

export async function requireGatewaySecret(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const exprected = process.env.GATEWAY_SECRET;

  if (!exprected) {
    return next(new AppError(500, "Gateway secret  is not configured"));
  }

  const incoming = req.header("x-gateway-secret");

  if (!incoming || incoming !== exprected) {
    return next(new AppError(403, "forbidden"));
  }

  next();
}
