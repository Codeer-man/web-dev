import dotenv from "dotenv";
import express from "express";
import { resolve } from "node:path";
import {
  logger,
  httpLogger,
  errorHanlder,
  successResponse,
  requireGatewaySecret,
  AppError,
} from "shared";
import taskRoute from "./routes/task.routes";
import { initKafka } from "./kafka";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), "../../.env") });

const PORT = process.env.TASK_PORT || "3002";

const app = express();

app.use(httpLogger);
app.use(express.json());

app.get("/health", (_req, res) => {
  successResponse(res, { service: "auth-service" });
});

app.use("/auth", requireGatewaySecret, requireGatewaySecret, taskRoute);

app.use((_req, _res, next) => {
  next(new AppError(404, "route not found"));
});

app.use(errorHanlder);

async function initStartUp() {
  try {
    await initKafka();
  } catch (error) {
    logger.error(error, "kafka init producer fialed");
  }
  app.listen(PORT, () => {
    logger.info(`Auth server running in port ${PORT}`);
  });
}

initStartUp();
