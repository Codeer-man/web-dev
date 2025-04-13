const Product = require("../model/product");

const sampleProduct = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Electronics",
        category: "Smartphone",
        price: 999,
        inStock: true,
        tags: ["latest", "5G", "flagship"],
      },
      {
        name: "Clothing",
        category: "T-Shirt",
        price: 19.99,
        inStock: true,
        tags: ["cotton", "casual", "summer"],
      },
      {
        name: "Appliances",
        category: "Refrigerator",
        price: 599,
        inStock: false,
        tags: ["energy-efficient", "double-door", "silver"],
      },
      {
        name: "Footwear",
        category: "Sneakers",
        price: 89.99,
        inStock: true,
        tags: ["sports", "running", "comfortable"],
      },
      {
        name: "Accessories",
        category: "Watch",
        price: 149.99,
        inStock: false,
        tags: ["digital", "waterproof", "fitness-tracking"],
      },
    ];
    const result = await Product.insertMany(sampleProducts);

    return res.status(200).json({
      sucess: true,
      data: `${result.length} Products are added`,
    });
  } catch (error) {
    console.log("Invalid server error");
    return res.status(500).json({
      sucess: false,
      msg: "Invalid server Error",
    });
  }
};

const productStatus = async (req, res) => {
  try {
    const result = await Product.aggregate([
      // stage 1
      {
        $match: {
          inStock: true,
          price: {
            $gte: 200,
          },
        },
      },
      // stage 2 group documents
      {
        $group: {
          _id: "$category",
          avgprice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log("Invalid server error");
    return res.status(500).json({
      sucess: false,
      msg: "Invalid server Error",
    });
  }
};

module.exports = { sampleProduct, productStatus };
