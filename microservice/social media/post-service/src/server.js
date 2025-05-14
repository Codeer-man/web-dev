require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const postRoute = require("./routes/path.routes");
const errorHandler = require("./middleware/errorhandler");
const logger = require("./utils/logger");
const Redis = require("ioredis");
const corsOptions = require("./config/corsOptoins");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");

const app = express();
const PORT = process.env.PORT || 3002;

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
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Sensetive endpoint limit evceed in ${req.ip}`);
    res.status(429).json({
      message: `Sensetive endpoint limit evceed in ${req.ip}`,
    });
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});
app.use(sensetiveEndpoints);

app.use(
  "/api/post",
  (req, res, next) => {
    req.redisClient = redisClient;
    next();
  },
  postRoute
);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Identity server running in port ${PORT}`);
  console.log(`server Running on port ${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandler rejection in ", promise, "reason:", reason);
});
