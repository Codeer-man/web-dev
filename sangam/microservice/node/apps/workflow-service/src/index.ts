import express from "express";
import { config } from "dotenv";
import { resolve } from "node:path";
import { errorHanlder, httpLogger, logger } from "shared";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), "../../.env") });

const PORT = process.env.port || "3001";

const app = express();

app.use(express.json());
app.use(httpLogger);
app.use(errorHanlder);

app.listen(PORT, () => {
  logger.info(`Server running in port ${PORT}`);
});
