require("dotenv").config();
const express = require("express");
const connectDB = require("./db/db");
const logger = require("./utils/logger");
const helmet = require("helmet");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes/identity-service..route");

// limiter
const Redis = require("ioredis");
//! DDOS protection and rate limiting
const { RateLimiterRedis } = require("rate-limiter-flexible");
const { RedisStore } = require("rate-limit-redis");
//! IP based rate Limiter
const { rateLimit } = require("express-rate-limit");

const app = express();

connectDB();

const redisCliet = new Redis(process.env.REDIS_URL) || "redis://localhost:6379";

// middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Request Body, ${req.body}`);
  next();
});

// prevent ddos attacts
const rateLimited = new RateLimiterRedis({
  storeClient: redisCliet,
  keyPrefix: "middleware",
  duration: 1,
  points: 10,
});

app.use((req, res, next) => {
  rateLimited
    .consume(req.ip)
    .then(() => next())
    .catch(() => {
      logger.warn(`Rate limit exceted of ip: ${req.ip}`);
      res.status(429).json({ success: false, message: "Too many requests" });
    });
});

// Ip based rate limiting for sensetive endpoints
const sensetiveEndpointLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`sensitive endpoint rate limit exceed for the ip: ${req.ip}`);
    res.status(429).json({ success: false, message: "Too many requests" });
  },
  store: new RedisStore({
    sendCommand: (...args) => redisCliet.call(...args),
  }),
});

// apply the sensitive endpoint
app.use(sensetiveEndpointLimiter);

app.use("/api/auth", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Identity server running in port ${PORT}`);
  console.log(`server Running on port ${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandler rejection in ", promise, "reason:", reason);
});
