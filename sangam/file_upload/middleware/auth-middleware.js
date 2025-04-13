const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access Denied. No token provided.",
    });
  }

  // Decode the token
  try {
    const decodTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userInfos = decodTokenInfo;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. Invalid token.",
      error: error.message,
    });
  }
};

module.exports = authmiddleware;
