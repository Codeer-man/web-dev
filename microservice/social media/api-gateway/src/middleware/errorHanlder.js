const logger = require("../utils/logger");

const errorhandler = (err, req, res, next) => {
  logger.err(err.status || 500);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";
  const success = err.success || false;

  res.status(statusCode).json({
    success,
    message,
  });
};

module.exports = errorhandler;
