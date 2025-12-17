import mongoose from "mongoose";

const URI = process.env.MONGO_URI!;

export async function connectTODB() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to database is established");
  } catch (error) {
    console.error("Mongo connection error!", error);
    process.exit(1);
  }
}
