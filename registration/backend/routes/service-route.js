const express = require("express");
const { service, makeService } = require("../controllers/servic-controllers");

const route = express.Router();

route.get("/find", service);
route.post("/make", makeService);

module.exports = route;
