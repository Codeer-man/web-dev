const express = require("express");
const {
  getalluser,
  getallcontact,
} = require("../controllers/admin-controller");
const isAdmin = require("../middleware/admin-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const route = express.Router();

route.get("/user", authMiddleware, isAdmin, getalluser);
route.get("/contact", authMiddleware, isAdmin, getallcontact);

module.exports = route;
