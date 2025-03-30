// const mongoose = require("mongoose");
import { mongoose } from "mongoose";

try {
  await mongoose.connect("mongodb://127.0.0.1/Mongodb_nodejs");
  mongoose.set("debug", true);
  console.log("database connected");
} catch (error) {
  console.error(error);
  process.exit(0);
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 4 },
  },
  { Timestamp: true }
);

const Users = mongoose.model("Users", userSchema);

await Users.create({ name: "Manish", email: "exampe12@gmail.com", age: 19 });

await mongoose.connection.close();
