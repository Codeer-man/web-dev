const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const validateUser = (req, res, next) => {
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];

  if (!token) {
    logger.warn("Token not provided");
    return res.status(401).json({
      success: false,
      message: "Token not provided",
    });
  }

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
    if (err) {
      logger.warn("Invalid token");
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = validateUser;
