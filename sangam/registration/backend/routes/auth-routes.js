const express = require("express");
const {
  registerUser,
  loginUser,
  userController,
  changePwd,
} = require("../controllers/auth-controllers");
const signupValidate = require("../validation/signup-validators");
const loginValidate = require("../validation/login-validation");
const validationMiddleware = require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const route = express.Router();

route.post("/register", validationMiddleware(signupValidate), registerUser);
route.post("/login", validationMiddleware(loginValidate), loginUser);

route.post("/changePwd", authMiddleware, changePwd);

route.get("/user", authMiddleware, userController);

module.exports = route;
