const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const router = express.Router();

// Protected admin-only route
router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({
    msg: "Welcome to the admin page",
    success: true,
  });
});

module.exports = router;
