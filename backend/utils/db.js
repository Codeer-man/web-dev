const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI || "";
("mongodb+srv://mdrmoney34:9LjGRXGzFIlVj9rw@cluster0.vvteu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
// const URI = 'mongodb+srv://mdrmoney34:moneymdr342024@cluster0.cgom8.mongodb.net/'

console.log(URI);

const connectionDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection sucessful");
  } catch (error) {
    console.error("database connection failed", error);
    process.exit(0);
  }
};

module.exports = connectionDB;
