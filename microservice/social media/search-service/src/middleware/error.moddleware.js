const logger = require("../utils/logger");


const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  logger.error(err.stack || err.message || "Unknown error");

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = errorHandler;
