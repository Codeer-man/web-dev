const mongoose = require("mongoose");

const URI = process.env.URI;

if (!URI) {
  console.error("Something wrong in the HTTP");
  process.exit(1);
}

const ConnectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("database connected");
  } catch (error) {
    console.error("something error is goin on", error);
    process.exit(1);
  }
};

module.exports = ConnectDb;
