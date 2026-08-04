import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError";

export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(", ");

      return next(new AppError(400, message));
    }

    req.body = result.data;

    next();
  };
}
