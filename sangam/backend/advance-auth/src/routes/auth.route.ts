import express from "express";
import {
  emailVerifyHandler,
  loginHandler,
  registerHandler,
} from "../controllers/auth/auth.controller";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/verify-email", emailVerifyHandler);

export default router;
