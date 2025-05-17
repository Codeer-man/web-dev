require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mediaRoute = require("./routes/Media.route");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/error.hanlder");
const { rateLimit } = require("express-rate-limit");
const { Redis } = require("ioredis");
const logger = require("./utils/logger");
const { RedisStore } = require("rate-limit-redis");
const Post = require("../../post-service/src/models/post");

const app = express();
const PORT = process.env.PORT || 3004;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    logger.info("Database connected");
    console.log("database connected");
  })
  .catch((error) => {
    logger.warn("Error while connecting the database", error);
    console.error("Error in database", error);
    process.exit(1);
  });

const redisClient = new Redis(process.env.Redis_URL);

app.use(helmet());
app.use(express.json());
// app.use(corsOptions());
app.use(cors());

app.use((req, res, next) => {
  logger.info(` Received ${req.method} request to ${req.url}`);
  logger.info(` Received body : ${JSON.stringify(req.body)}`);
  next();
});

const sensetiveEndpoints = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    logger.warn(`sensetiveEndpoint limit exceed in ${req.url}`);
    res.status(429).json({
      message: `Sensetive endpoint limit exceed in ${req.url}`,
    });
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

app.use(sensetiveEndpoints);

app.use("/api/media", mediaRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on the port ${PORT}`);
  console.log(`Server is running on the port ${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandler rejection in ", promise, "reason:", reason);
});
