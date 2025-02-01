const express = require("express");
const adminMiddleware = require("../middleware/admin-middleware");
const authmiddleware = require("../middleware/auth-middleware");

const router = express.Router();
router.get("/welcome", authmiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({
    msg: "welcome to admin page",
    sucess: true,
  });
});

module.exports = router;
