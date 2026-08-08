import express from "express";
import { config } from "dotenv";
import { resolve } from "node:path";
import {
  AppError,
  errorHanlder,
  httpLogger,
  logger,
  requireGatewaySecret,
  successResponse,
} from "shared";
import authRouter from "./routes/auth.route";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), "../../.env") });

const PORT = process.env.AUTH_PORT || 3001;

const app = express();

app.use(httpLogger);
app.use(express.json());

app.get("/health", (_req, res) => {
  successResponse(res, { service: "auth-service" });
});

app.use("/auth", requireGatewaySecret, authRouter);

app.use((_req, _res, next) => {
  next(new AppError(404, "route not found"));
});

app.use(errorHanlder);

app.listen(PORT, () => {
  logger.info(`Auth server running in port ${PORT}`);
});
