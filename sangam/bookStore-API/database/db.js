const mongoose = require("mongoose");
const URI = process.env.URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("database connection established");
  } catch (error) {
    console.error("Mongoose connection failed", error);
    process.exit(0);
  }
};

module.exports = connectDB;
