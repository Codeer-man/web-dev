import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./utils/db";
import { authRoutes } from "./routes/index";
import { errorHandler } from "./middleware/error.middleware";
import cookieParse from "cookie-parser";

const app = express();
app.use(express.json());

connectDB();

app.use(cookieParse());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

const PORT: number = 8080;
app.listen(PORT, () => {
  console.log(`server running in ${PORT}`);
});
