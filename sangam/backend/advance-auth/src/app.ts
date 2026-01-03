import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

export default app;
