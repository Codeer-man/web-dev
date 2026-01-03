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
import {
  googleAuthCallbackHanlder,
  googleAuthStartHandler,
} from "../controllers/auth/googleAuth.controller";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/verify-email", emailVerifyHandler);
router.post("/refresh", refreshHandler);
router.post("/logout", logoutHandler);
router.post("/forget-password", forgetPwdHanlder);
router.post("/reset-password", resetPwdHandler);
// google
router.get("/google", googleAuthStartHandler);
router.get("/google/callback", googleAuthCallbackHanlder);
export default router;
