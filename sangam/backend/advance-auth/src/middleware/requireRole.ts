import { NextFunction, Request, Response } from "express";

export function requireRole(role: "user" | "admin") {
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as any;
    const authUser = authReq.User;

    if (!authUser) {
      return res.status(401).json({
        message: "The user is not authenticated",
      });
    }

    if (authUser.role !== role) {
      return res.status(401).json({
        message: "The user is not authenticated",
      });
    }
    next();
  };
}
