import express from "express";
const { authRegister, authLogin } = require("../controllers/auth.controller");

const router = express.Router();

// Register route
router.post("/register", authRegister);

// Add other routes below as needed
router.post("/login", authLogin);
// router.post("/logout", authLogout);

export default router;
