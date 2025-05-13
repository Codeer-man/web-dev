const express = require("express");
const {
  userRegister,
  userLogin,
  logoutUser,
  refreshToken,
} = require("../controller/identity.controller");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", logoutUser);
router.post("/refresh", refreshToken);

module.exports = router;
