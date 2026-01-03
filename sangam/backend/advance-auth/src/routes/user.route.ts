import express, { Request, Response } from "express";
import reqAuth from "../middleware/reqAuth";

const router = express.Router();

router.get("/user", reqAuth, (req: Request, res: Response) => {
  const authReq = req as any;
  const authUser = authReq.user;

  return res.status(201).json({
    user: authUser,
  });
});

export default router;
