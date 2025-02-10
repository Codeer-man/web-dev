const express = require("express");
const {
  getalluser,
  getallcontact,
  DeleteUser,
  UpdatedUser,
  DeleteContact,
} = require("../controllers/admin-controller");
const isAdmin = require("../middleware/admin-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const route = express.Router();

route.get("/user", authMiddleware, isAdmin, getalluser);
route.get("/contact", authMiddleware, isAdmin, getallcontact);
route.delete("/deleteUser/:id", DeleteUser);
route.delete("/deleteContact/:id", DeleteContact);
route.patch("/updateUser/:id/edit", UpdatedUser);

module.exports = route;
