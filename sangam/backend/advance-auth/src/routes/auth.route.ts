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
  twoFA_VerifyHandler,
  twoFASetupHandler,
} from "../controllers/auth/googleAuth.controller";
import reqAuth from "../middleware/reqAuth";

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
//authenticator
router.post("/2fa/setup", reqAuth, twoFASetupHandler);
router.post("/2fa/verify", reqAuth, twoFA_VerifyHandler);

export default router;
