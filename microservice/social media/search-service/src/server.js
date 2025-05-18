require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const Redis = require("ioredis");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/error.moddleware");
const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const { RateLimiterRedis } = require("rate-limiter-flexible");
const searchRoutes = require("./routes/search.routes");
const { connectToRabbitMq, consumeEvent } = require("./utils/rabbitmq");
const {
  handlePostCreated,
  handlePostDelete,
} = require("./event-handler/searchEventhandler");

const app = express();

const redisClient = new Redis(process.env.REDIS_URL);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    logger.info("Connected to database");
    console.log("Connected to database");
  })
  .catch((err) => {
    logger.error("Could not connect to database", err);
    console.error(err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(helmet());

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  duration: 5,
  points: 10,
  keyPrefix: "search_Unique",
});

app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => next())
    .catch((err) => {
      logger.warn(`Rate limit exceted of ip: ${req.ip}`);
      res.status(429).json({ success: false, message: "Too many requests" });
    });
});

const sensetivEndpoint = rateLimit({
  windowMs: 15 * 60 * 100,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.error(`Sensetive endpoiint limit hit in ${req.url}`);
    res.status(429).json("Sensetive endpoiint limit hit");
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

app.use(sensetivEndpoint);

app.use("/api/search", searchRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 3004;
async function startServer() {
  try {
    await connectToRabbitMq();

    // rabbit consume event
    await consumeEvent("post.created", handlePostCreated);
    await consumeEvent("post.delete", handlePostDelete);

    app.listen(PORT, () => {
      logger.info(`server is running in port ${PORT}`);
    });
  } catch (error) {
    logger.error("failed to start server", error);
    process.exit(1);
  }
}

startServer();
