const express = require("express");
const { sampleProduct, productStatus } = require("../controller/Product");

const router = express.Router();

router.post("/add", sampleProduct);
router.get("/status", productStatus);

module.exports = router;
