"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_middleware_1 = require("../middleware/validate.middleware");
const authSchema_1 = require("../validation/authSchema");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const password_controller_1 = require("../controllers/password.controller");
const { authRegister, authLogin } = require("../controllers/auth.controller");
const router = express_1.default.Router();
// get user info route 
router.get("/getUser", auth_middleware_1.authmiddleware, auth_controller_1.getUserById);
// Register route
router.post("/register", (0, validate_middleware_1.validation)(authSchema_1.registerSchema), authRegister);
// login route
router.post("/login", (0, validate_middleware_1.validation)(authSchema_1.loginSchema), authLogin);
// router.post("/logout", authLogout);
// email verify route 
router.post("/verify-email", password_controller_1.verifyEmail);
// forget password 
router.post("/forgetPassword", password_controller_1.forgetPassword);
exports.default = router;
