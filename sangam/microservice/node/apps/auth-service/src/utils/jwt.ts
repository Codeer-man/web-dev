import { AppError } from "shared";
import { jwtPayload } from "../types/auth.type";
import jwt from "jsonwebtoken";

function extractJWTSecret() {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new AppError(404, "jwt secret is not set");
  }

  return jwtSecret;
}

export function signToken(payload: jwtPayload) {
  const jwtExpire = process.env.JWT_EXPIRE || "7d";
  return jwt.sign(payload, extractJWTSecret(), {
    expiresIn: jwtExpire as jwt.SignOptions["expiresIn"],
  });
}
