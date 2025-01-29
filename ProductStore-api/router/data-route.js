const express = require("express");
const {
  addProducts,
  getAllProduct,
  getProductById,
  updateProductByid,
  deleteProductById,
} = require("../controller/ProductController");

const router = express.Router();

router.post("/add", addProducts);
router.get("/show", getAllProduct);
router.get("/show/:id", getProductById);
router.put("/update/:id", updateProductByid);
router.delete("/delete/:id", deleteProductById);

module.exports = router;
