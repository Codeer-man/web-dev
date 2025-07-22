require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.routes");
const Product = require("./model/product");
const User = require("./model/user");

const app = express();

// const product = [
//   {
//     name: "Classic White T-Shirt",
//     description: "100% cotton, slim fit t-shirt",
//     price: 19.99,
//     brand: "CottonClub",
//     category: "Clothing",
//     inStock: true,
//     tags: ["tshirt", "cotton", "summer"],
//     images: ["https://dummyimage.com/600x400/fff/000&text=White+T-Shirt"],
//   },
//   {
//     name: "Bluetooth Wireless Earbuds",
//     description: "Noise-cancelling with 24h battery life",
//     price: 49.99,
//     brand: "SoundPro",
//     category: "Electronics",
//     inStock: true,
//     tags: ["audio", "wireless", "earbuds"],
//     images: ["https://dummyimage.com/600x400/000/fff&text=Earbuds"],
//   },
//   {
//     name: "Gaming Mouse",
//     description: "Ergonomic design with RGB lighting",
//     price: 29.99,
//     brand: "GameTech",
//     category: "Accessories",
//     inStock: true,
//     tags: ["gaming", "mouse", "rgb"],
//     images: ["https://dummyimage.com/600x400/111/eee&text=Gaming+Mouse"],
//   },
//   {
//     name: "Running Shoes",
//     description: "Lightweight and breathable shoes for runners",
//     price: 69.99,
//     brand: "RunFit",
//     category: "Footwear",
//     inStock: false,
//     tags: ["shoes", "running", "sport"],
//     images: ["https://dummyimage.com/600x400/333/fff&text=Running+Shoes"],
//   },
//   {
//     name: "Water Bottle 1L",
//     description: "BPA-free bottle with flip cap",
//     price: 14.99,
//     brand: "HydroClear",
//     category: "Home",
//     inStock: true,
//     tags: ["bottle", "hydration", "home"],
//     images: ["https://dummyimage.com/600x400/0af/fff&text=Water+Bottle"],
//   },
//   {
//     name: "Laptop Backpack",
//     description: "Spacious with anti-theft design",
//     price: 39.99,
//     brand: "UrbanPack",
//     category: "Bags",
//     inStock: true,
//     tags: ["backpack", "laptop", "travel"],
//     images: ["https://dummyimage.com/600x400/222/fff&text=Backpack"],
//   },
//   {
//     name: "Smart LED Bulb",
//     description: "Voice-controlled, multi-color smart bulb",
//     price: 12.99,
//     brand: "SmartLite",
//     category: "Electronics",
//     inStock: true,
//     tags: ["smart", "bulb", "lighting"],
//     images: ["https://dummyimage.com/600x400/f90/fff&text=LED+Bulb"],
//   },
//   {
//     name: "Notebook A5 - 200 Pages",
//     description: "Hardcover with smooth paper for writing",
//     price: 5.99,
//     brand: "WriteWell",
//     category: "Stationery",
//     inStock: true,
//     tags: ["notebook", "paper", "writing"],
//     images: ["https://dummyimage.com/600x400/ccc/000&text=Notebook"],
//   },
//   {
//     name: "Desk Lamp",
//     description: "Adjustable brightness, modern design",
//     price: 25.99,
//     brand: "BrightLite",
//     category: "Home",
//     inStock: false,
//     tags: ["lamp", "desk", "light"],
//     images: ["https://dummyimage.com/600x400/888/fff&text=Desk+Lamp"],
//   },
//   {
//     name: "Yoga Mat",
//     description: "Non-slip surface, eco-friendly material",
//     price: 22.49,
//     brand: "FlexFit",
//     category: "Fitness",
//     inStock: true,
//     tags: ["yoga", "mat", "fitness"],
//     images: ["https://dummyimage.com/600x400/0f0/000&text=Yoga+Mat"],
//   },
// ];

// const user = [
//   {
//     name: "John Doe",
//     email: "john@example.com",
//     password: "$2a$10$1234hashedjohn",
//     role: "user",
//   },
//   {
//     name: "Jane Smith",
//     email: "jane@example.com",
//     password: "$2a$10$1234hashedjane",
//     role: "user",
//   },
//   {
//     name: "Alice Brown",
//     email: "alice@example.com",
//     password: "$2a$10$1234hashedalice",
//     role: "user",
//   },
//   {
//     name: "Bob Johnson",
//     email: "bob@example.com",
//     password: "$2a$10$1234hashedbob",
//     role: "admin",
//   },
//   {
//     name: "Charlie Miller",
//     email: "charlie@example.com",
//     password: "$2a$10$1234hashedcharlie",
//     role: "user",
//   },
//   {
//     name: "David Lee",
//     email: "david@example.com",
//     password: "$2a$10$1234hasheddavid",
//     role: "user",
//   },
//   {
//     name: "Emma Wilson",
//     email: "emma@example.com",
//     password: "$2a$10$1234hashedemma",
//     role: "user",
//   },
//   {
//     name: "Frank Harris",
//     email: "frank@example.com",
//     password: "$2a$10$1234hashedfrank",
//     role: "user",
//   },
//   {
//     name: "Grace Clark",
//     email: "grace@example.com",
//     password: "$2a$10$1234hashedgrace",
//     role: "admin",
//   },
//   {
//     name: "Henry Lewis",
//     email: "henry@example.com",
//     password: "$2a$10$1234hashedhenry",
//     role: "user",
//   },
// ];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");

    // return Promise.all([Product.insertMany(product), User.insertMany(user)])
    //   .then(() => {
    //     console.log("prodcut sedding success");
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;

app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Connected to server http://localhost:${PORT}`);
});
