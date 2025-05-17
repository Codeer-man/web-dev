require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const ConfigCors = require("./config/corsConfig");
const Redis = require("ioredis");
const proxy = require("express-http-proxy");
const helmet = require("helmet");
// limit
const { RedisStore } = require("rate-limit-redis");
//! IP based rate Limiter
const { rateLimit } = require("express-rate-limit");
const errorHandler = require("./middleware/errorHanlder");
const validateUser = require("./middleware/authMiddleware");

const app = express();

const PORT = process.env.PORT || 3000;
const redisClient = new Redis(process.env.Redis_URL);

mongoose
  .connect(process.env.Mongo_URI)
  .then(() => {
    logger.info(`Data base connected `);
    console.log("Database connected");
  })
  .catch((err) => {
    logger.error(`failed to connect to database ${err}`);
    return console.error(`failed to connect to database ${err}`);
  });

// middleware
app.use(express.json());
app.use(helmet());
app.use(ConfigCors());

const rateLimitoptions = rateLimit({
  window: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`sensitive endpoint rate limit exceed for the ip: ${req.ip}`);
    res.status(429).json({ success: false, message: "Too many requests" });
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

app.use(rateLimitoptions);

app.use((req, res, next) => {
  logger.info(` Received ${req.method} request to ${req.url}`);
  logger.info(` Received body : ${JSON.stringify(req.body)}`);
  next();
});

const proxyOption = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (err, res, next) => {
    logger.error(`Proxy error: ${err}`);
    res.status(500).json({ message: "Internal server error", error: err });
  },
};

// setting up proxy for out indentity services
app.use(
  "/v1/auth",
  proxy(process.env.Identity_Service_URL, {
    ...proxyOption,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["Content-Type"] = "application/json";

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `response received from Identity service ${proxyRes.statusCode}`
      );
      return proxyResData;
    },
  })
);
// setting up proxy for out post services
app.use(
  "/v1/post",
  validateUser,
  proxy(process.env.Post_Service_URL, {
    ...proxyOption,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["Content-Type"] = "application/json";
      proxyReqOpts.headers["x-user-id"] = srcReq.user.id;

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `response received from Identity service ${proxyRes.statusCode}`
      );
      console.log(proxyResData);

      return proxyResData;
    },
  })
);

// setting up proxy for out media services
app.use(
  "/v1/media",
  validateUser,
  proxy(process.env.Media_Service_URL, {
    ...proxyOption,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["x-user-id"] = srcReq.user.id;
      if (!srcReq.headers["content-type"].startsWith("multipart/form-data")) {
        proxyReqOpts.headers["Content-Type"] = "application/json";
      }

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from media service: ${proxyRes.statusCode}`
      );

      return proxyResData;
    },
    parseReqBody: false,
  })
);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`api-gateway server running in port ${PORT}`);
  logger.info(
    `Identity server running in port ${process.env.Identity_Service_URL}`
  );
  logger.info(`Post server running in port ${process.env.Post_Service_URL}`);
  logger.info(`mdeia server running in port ${process.env.Media_Service_URL}`);
  logger.info(`Redis in  ${process.env.Redis_URL}`);

  console.log(`server Running on port ${PORT}`);
});
