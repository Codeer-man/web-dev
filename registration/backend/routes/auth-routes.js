const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth-controllers");
const validate = require("../validation/auth-validators");
const validationMiddleware = require("../middleware/validate-middleware");

const route = express.Router();

route.post("/register", validationMiddleware(validate), registerUser);
route.post("/login", validationMiddleware(validate), loginUser);

module.exports = route;
