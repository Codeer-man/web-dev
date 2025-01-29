const mongoose = require("mongoose");

const URI = process.env.URI;

const ConnectDB = async (req, res) => {
  try {
    await mongoose.connect(URI);
    console.log("Data base connected sucessfully");
  } catch (error) {
    console.error("Unsucessfull to connect to Database", error);
    process.exit(0);
  }
};
module.exports = ConnectDB;
    