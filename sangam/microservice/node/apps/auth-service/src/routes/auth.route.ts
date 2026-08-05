import { Router } from "express";
import { validate } from "shared";
import { loginSchema, registerSchema } from "../schema/auth.schema";
import * as authController from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.get("/me", authController.getMe);
export default authRouter;
