require("dotenv").config();
const connectDB = require("./database/db");
const BookRoutes = require("./routes/book-routes.js");
const express = require("express");

// connect to database
connectDB();

const app = express();

// middleware export json()
app.use(express.json());

// router here
app.use("/api/books", BookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
