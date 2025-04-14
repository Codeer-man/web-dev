import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const URI = process.env.URI || "mongodb://localhost:27017/auth-ts";
    if (!URI) {
      throw new Error("MongoDB connection URI is missing");
    }
    await mongoose.connect(URI);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
