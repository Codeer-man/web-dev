const express = require("express");
const authmiddleware = require("../middleware/auth-middleware");
const adminmiddleware = require("../middleware/admin-middleware");

const router = express.Router();
router.get("/welcome", authmiddleware, adminmiddleware, (req, res) => {
  res.status(200).json({
    msg: "welcome to admin page",
    sucess: true,
  });
});

module.exports = router;
