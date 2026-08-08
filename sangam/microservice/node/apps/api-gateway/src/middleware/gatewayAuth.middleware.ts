import type { Request, NextFunction, Response } from "express";
import { AppError, verifyToken } from "shared";
import { getAllowedRole, isPublicRoute } from "../rbac";

const IDENTITY_HEADER = [
  "x-user-id",
  "x-user-role",
  "x-gateway-secret",
] as const;

function stripIdentityHeaders(req: Request) {
  for (const header of IDENTITY_HEADER) {
    delete req.headers[header];
  }
}

function attachGatewaySecret(req: Request) {
  const gatewaySecret = process.env.GATEWAY_SECRET;

  if (!gatewaySecret) {
    throw new AppError(404, "gateway secret not set/config/missing");
  }
  req.headers["x-gateway-secret"] = gatewaySecret;
}

function requestPath(req: Request) {
  const combinePath = `${req.baseUrl}${req.path}`;

  if (combinePath.length >= 1 && combinePath.endsWith("/")) {
    return combinePath.slice(0, -1);
  }

  return combinePath || "/";
}

function attachUserHeaders(req: Request, userId: string, role: string) {
  ((req.headers["x-user-id"] = userId), (req.headers["x-user-role"] = role));
}

export function gatewayAuth(req: Request, res: Response, next: NextFunction) {
  try {
    //delete all the header present before running the middleware
    stripIdentityHeaders(req);

    //proves the auth service that the headers came through the gateway
    attachGatewaySecret(req);

    const path = requestPath(req);

    //   check if the path is public route

    // if public give access
    if (isPublicRoute(req.method, path)) {
      return next();
    }

    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(401, "missing or invalid auth token");
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyToken(token);

    //is the role allowed to this path or not

    const allowedRole = getAllowedRole(req.method, path);

    if (!allowedRole) {
      throw new AppError(404, "route not found");
    }

    //forbiddent route
    if (!allowedRole.includes(payload.role)) {
      throw new AppError(403, "forbiden route: You are not allowed");
    }

    attachUserHeaders(req, payload.userId, payload.role);
    next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    return next(new AppError(401, "invalid or expired token"));
  }
}
