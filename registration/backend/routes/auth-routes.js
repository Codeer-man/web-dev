const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth-controllers");
const signupValidate = require("../validation/signup-validators");
const loginValidate = require("../validation/login-validation");
const validationMiddleware = require("../middleware/validate-middleware");

const route = express.Router();

route.post("/register", validationMiddleware(signupValidate), registerUser);
route.post("/login", validationMiddleware(loginValidate), loginUser);

module.exports = route;
