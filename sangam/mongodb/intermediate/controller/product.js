const product = require("../model/product")


const insertSampleProducts = async(req,res)=>{
    try {
        const sampleProducts = [
  {
    name: "Wireless Mouse",
    category: "Electronics",
    price: 25.99,
    inStock: true,
    tags: ["computer", "accessory", "wireless"]
  },
  {
    name: "Gaming Keyboard",
    category: "Electronics",
    price: 45.50,
    inStock: true,
    tags: ["gaming", "keyboard", "mechanical"]
  },
  {
    name: "Water Bottle",
    category: "Home & Kitchen",
    price: 10.99,
    inStock: false,
    tags: ["kitchen", "hydration", "bottle"]
  },
  {
    name: "Notebook",
    category: "Stationery",
    price: 3.49,
    inStock: true,
    tags: ["writing", "school", "notes"]
  },
  {
    name: "LED Desk Lamp",
    category: "Home & Office",
    price: 18.75,
    inStock: true,
    tags: ["lighting", "LED", "desk"]
  }
]

const data =await product.insertMany(sampleProducts);

    res.status(201).json({
        success:true,message:data
    })
    } catch (error) {
        res.status(500).json({success:false,error:error})
    }
}

module.exports = insertSampleProducts