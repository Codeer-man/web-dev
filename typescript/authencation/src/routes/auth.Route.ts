import express from "express";
import { validation } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../validation/authSchema";
import { getUserById } from "../controllers/auth.controller";
import { authmiddleware } from "../middleware/auth.middleware";
import { forgetPassword, verifyEmail } from "../controllers/password.controller";

const { authRegister, authLogin } = require("../controllers/auth.controller");

const router = express.Router();

// get user info route 
router.get("/getUser",authmiddleware,getUserById)

// Register route
router.post("/register", validation(registerSchema), authRegister);

// login route
router.post("/login", validation(loginSchema), authLogin);
// router.post("/logout", authLogout);

// email verify route 
router.post("/verify-email",verifyEmail)

// forget password 
router.post("/forgetPassword", forgetPassword)

export default router;
