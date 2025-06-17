
const express = require("express")
const insertSampleProducts = require("../controller/product")

const router = express.Router()

router.post("/add",insertSampleProducts)

module.exports = router