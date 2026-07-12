// const mongoose = require("mongoose");
import mongoose from 'mongoose';


const URI = process.env.MONGODB_URI || 'mongodb+srv://mdrmoney34:mdrmoney34@cluster0.vvteu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
console.log(URI);

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful to DB");
  } catch (error) {
    console.error("database connection fail");
    process.exit(0);
  }
};

export default connectDb;
