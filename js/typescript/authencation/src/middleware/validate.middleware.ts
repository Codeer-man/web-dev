import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validation =
  (Schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = Schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: "Validation failed",
        issues: result.error.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
      return;
    }

    req.body = result.data;
    next();
  };
