require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const insertsample = require("./router/product_route");

const app = express();

// const mongodb = async () => {
//   const URI = process.env.MONGODB_URI;
//   if (!URI) {
//     console.log("Link is not coming");
//   }
//   try {
//     const connect = await mongoose.connect(URI);
//     if (!connect) {
//       console.log("error in the Link");
//     } else {
//       console.log("Connected to database");
//     }
//   } catch (error) {
//     console.log("Internal server error");
//     process.exit(1);
//   }
// };
// mongodb();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("database connected"))
  .catch((e) => console.log(e));

// middleware
app.use(express.json());

// route
app.use("/api/auth", insertsample);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
