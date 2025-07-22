const express = require("express");

const getStockProduct = require("../controller/product");

const router = express.Router();

router.get("/p", getStockProduct);

module.exports = router;
