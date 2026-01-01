import express from "express";
import {
  emailVerifyHandler,
  forgetPwdHanlder,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPwdHandler,
} from "../controllers/auth/auth.controller";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/verify-email", emailVerifyHandler);
router.post("/refresh", refreshHandler);
router.post("/logout", logoutHandler);
router.post("/forget-password", forgetPwdHanlder);
router.post("/reset-password", resetPwdHandler);
export default router;
