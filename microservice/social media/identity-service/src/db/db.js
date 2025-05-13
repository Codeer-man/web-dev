const mongoose = require("mongoose");
const logger = require("../utils/logger");

const URI =
  process.env.MONGO_URL || "mongodb://localhost:27017/identityServices";

async function connectDB() {
  try {
    if (!URI) {
      return console.error("URI not found");
    }

    await mongoose.connect(URI);
    logger.info("Database connected");
    console.log("Database has been connected");
  } catch (error) {
    console.error(error);
    logger.error("Mongodb error", error);
    process.exit(1);
  }
}

module.exports = connectDB;
