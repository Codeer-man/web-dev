require("dotenv").config();

const express = require("express");
const ConnectDB = require("./utilis/db");
const ProductRoutes = require("./router/data-route");

const app = express();
// connect to database
ConnectDB();
// middleware
app.use(express.json());

app.use("/product/store", ProductRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "This is home page",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running in PORT : ${PORT}`);
});
