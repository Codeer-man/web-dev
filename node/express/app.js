require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
