import express from "express";
const router = express.Router();
import authControllers from "../controllers/auth-controller.js";

router.route("/").get(authControllers.home);
router.route("/register").get(authControllers.register);
router.route("/register").post(authControllers.register);

export default router;
