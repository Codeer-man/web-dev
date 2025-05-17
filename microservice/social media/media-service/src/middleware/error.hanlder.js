const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  err.statusCode = err.status || 500;
  err.success = err.success || false;
  err.message = err.message;

  res.status(err.statusCode).json({
    success: err.success,
    message: err.message || "Invalid serve rerror",
  });
};

module.exports = errorHandler;
