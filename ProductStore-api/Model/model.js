const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Product name is required"],
    maxlength: [20, "Product name can only consist 20 words"],
  },
  price: {
    type: Number,
    require: [true, "Product price is required"],
    min: [1, "Product price should be at least $1"],
  },
  category: {
    type: String,
    require: [true, "Product categoyr is required"],
    minlength: [2],
  },
  publish: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
