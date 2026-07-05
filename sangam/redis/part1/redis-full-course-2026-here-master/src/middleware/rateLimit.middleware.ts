import type { Request, Response, NextFunction } from "express";
import { redisClient } from "../redis/client";

const RATE_LIMTI_WINDOW_SECOND = 60;
const RATE_LIMIT_REQUEST_LIMIT = 5;

export async function rateLimit(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ip = req.ip || "unknown";
    const rateLimitKey = `Product:${ip}`;

    const requestCount = await redisClient.incr(rateLimitKey);

    if (requestCount === 1) {
      await redisClient.expire(rateLimitKey, RATE_LIMTI_WINDOW_SECOND);
    }

    res.setHeader("X-RateLimit-limit-key", rateLimitKey);
    res.setHeader(
      "X-RateLimit-Remainig",
      Math.max(0, RATE_LIMIT_REQUEST_LIMIT - requestCount),
    );

    if (requestCount > RATE_LIMIT_REQUEST_LIMIT) {
      return res.status(429).json({
        success: false,
        message: "Too many request. Please try later",
      });
    }

    next();
  } catch (error) {
    console.log("rate limit error", error);

    next(error);
  }
}
