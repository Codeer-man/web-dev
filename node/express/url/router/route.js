const express = require("express");
const {
  getData,
  postdata,
  shortCode,
} = require("../controller/post-controller");

const route = express.Router();

route.get("/", getData);

route.post("/", postdata);

route.get("/:shortCode", shortCode);

module.exports = route;
