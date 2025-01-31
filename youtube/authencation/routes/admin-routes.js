const express = require("express");
const adminMiddleware = require("../middleware/admin-middleware");

const router = express.Router();
router.get("/welcome", adminMiddleware, (req, res) => {
  res.status(200).json({
    msg: "welcome to admin page",
    sucess: true,
  });
});

module.exports = router;
