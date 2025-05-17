const logger = require("../utils/logger");

const authenticateRequest = (req, res) => {
  const userId = req.headers["x-user0id"];

  if (!userId) {
    logger.warn("Access attempted without without user Id");
    return res.status(401).json({
      success: false,
      message: "Authintication requrie, Please login to continue",
    });
  }

  req.user = userId;
  next();
};

module.exports = authenticateRequest;
