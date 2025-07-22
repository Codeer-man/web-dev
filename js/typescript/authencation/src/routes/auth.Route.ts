import express from "express";
import { validation } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../validation/authSchema";
import { getUserById, logout } from "../controllers/auth.controller";
import { authmiddleware } from "../middleware/auth.middleware";
import { forgetPassword } from "../controllers/password.controller";
import { verifyEmail } from "../controllers/verify.controller";

const { authRegister, authLogin } = require("../controllers/auth.controller");

const router = express.Router();

// get user info route
router.get("/getUser", authmiddleware, getUserById);

// Register route
router.post("/register", validation(registerSchema), authRegister);

// login route
router.post("/login", validation(loginSchema), authLogin);

// log out
router.post("/logout", authmiddleware, logout);

// email verify route
router.post("/verify-email/:id", authmiddleware, verifyEmail);

// forget password
router.post("/forgetPassword", authmiddleware, forgetPassword);

export default router;
