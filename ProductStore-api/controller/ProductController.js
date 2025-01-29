const Product = require("../Model/model");

const addProducts = async (req, res) => {
  try {
    const product = req.body;
    const addNewProduct = await Product.create(product);
    if (addNewProduct) {
      res.status(200).json({
        msg: "New Product has been added",
        data: addNewProduct,
        sucess: true,
      });
    } else {
      res.status(400).json({
        msg: "Please fill all the form",
        sucess: false,
      });
    }
  } catch (error) {
    console.log("Something wrong in the server", error.message);

    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const getProduct = await Product.find({});
    if (getProduct) {
      res.status(200).json({
        msg: "all the product are here",
        data: getProduct,
        sucess: true,
      });
    } else {
      res.status(404).json({
        msg: "product not found",
        sucess: false,
      });
    }
  } catch (error) {
    console.log("Something wrong in the server", error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const findProductId = await Product.findById(productId);

    if (findProductId) {
      res.status(200).json({
        msg: "Product had been found",
        data: findProductId,
        sucess: true,
      });
    } else {
      res.status(404).json({
        msg: "Given Id is invalid",
        sucess: false,
      });
    }
  } catch (error) {
    console.log("Something wrong in the server", error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const updateProductByid = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateProductData = req.body;
    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      updateProductData,
      { new: true }
    );
    if (updateProduct) {
      res.status(200).json({
        msg: "updated Product is here",
        sucess: true,
        data: updateProduct,
      });
    } else {
      res.status(404).json({
        msg: "Product id not found",
        sucess: false,
      });
    }
  } catch (error) {
    console.log("Something wrong in the server", error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (deleteProduct) {
      res.status(200).json({
        msg: "product had been deleted",
        data: deleteProduct,
        sucess: true,
      });
    } else {
      res.status(404).json({
        msg: "Product Id is invalid",
        sucess: false,
        id: productId,
      });
    }
  } catch (error) {
    console.log("Something wrong in the server", error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

module.exports = {
  addProducts,
  getAllProduct,
  getProductById,
  updateProductByid,
  deleteProductById
};
