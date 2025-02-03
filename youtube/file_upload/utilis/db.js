const mongoose = require("mongoose");

const URI = process.env.URI;

if (!URI) {
  console.log("Database URI is not defined in environment variablest");
}

const ConnectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connectoin is sucessful");
  } catch (error) {
    console.log("something ewn wrong", error);
    process.exit(1);
  }
};
module.exports = ConnectDB;
