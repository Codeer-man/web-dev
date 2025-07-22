const Product = require("../model/product");

const getStockProduct = async (req, res) => {
  try {
    const data = await Product.find({
      // inStock: { $eq: false },
      // price: { $lte: 10, $gte: 5 },
      // tags: { $in: ["bottle", "lamp", "yoga", "paper"] },
      // inStock: { $ne: true },
    });
    console.log(data, "data");

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getStockProduct;
