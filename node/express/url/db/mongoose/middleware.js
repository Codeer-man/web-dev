import mongoose, { Schema, model } from "mongoose";

try {
  await mongoose.connect("mongodb://127.0.0.1/Mongodb_middleware");
} catch (error) {
  console.error(error);
  process.exit(0);
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 4 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  } //,
  //{ Timestamp: true }
);

userSchema.pre(["updateOne", "save"], function (next) {
  this.set({ updatedAt: Date.now() });
  next();
  s;
});

const Users = mongoose.model("Users", userSchema);

// middleware

// create user
// await Users.create({ name: "Albedo", email: "overlord@gmail.com", age: 34 });

// update user
await Users.updateOne({ email: "overlord@gmail.com" }, { $set: { age: 18 } });

await mongoose.connection.close();
