import jwt from "jsonwebtoken";
import { jwtPayload } from "./types";
import { AppError } from "../error/AppError";

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

export function verifyToken(token: string): jwtPayload {
  const decodeToken = jwt.verify(token, extractJWTSecret()) as jwtPayload;

  if (
    typeof decodeToken !== "object" ||
    decodeToken === null ||
    typeof decodeToken.userId !== "string" ||
    (decodeToken.role !== "USER" && decodeToken.role !== "ADMIN")
  ) {
    throw new Error("Invalid token payload");
  }

  return {
    userId: decodeToken.userId,
    role: decodeToken.role,
  };
}
