import { sign, verify } from "jsonwebtoken";

export function createAccessToken(
  userId: string,
  role: "user" | "admin",
  tokenVersion: number
) {
  const payload = { sub: userId, role, tokenVersion };

  return sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "30min",
  });
}

export function createRefreshToken(
  userId: string,

  tokenVersion: number
) {
  const payload = { sub: userId, tokenVersion };

  return sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "30min",
  });
}

export function verifyRefreshToken(token: string) {
  return verify(token, process.env.JWT_ACCESS_SECRET!) as {
    sub: string;
    tokenVersion: number;
  };
}

export async function verifyAccessToken(token: string) {
  return verify(token, process.env.JWT_ACCESS_SECRET!) as {
    sub: string;
    role: "user" | "admin";
    tokenVersion: number;
  };
}
