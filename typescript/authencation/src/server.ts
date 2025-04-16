import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import connectDB from "./utils/db";
import { authRoutes, SessionRoutes } from "./routes/index";
import { errorHandler } from "./middleware/error.middleware";
import cookieParse from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "localhost://5173",
    credentials: true,
  })
);

app.use(cookieParse());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/session", SessionRoutes);

app.use(errorHandler);

const PORT: number = 8080;
app.listen(PORT, () => {
  console.log(`server running in ${PORT}`);
});
