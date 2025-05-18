const logger = require("../utils/logger");

const authenticateRequest = (req, res, next) => {
  const userId = req.headers["x-user-id"];

  if (!userId) {
    logger.error("User Id not found");
    return res.status(401).json({
      success: false,
      message: "Authintication requrie, Please login to continue",
    });
  }
  req.user = userId;
  next();
};

module.exports = authenticateRequest;
