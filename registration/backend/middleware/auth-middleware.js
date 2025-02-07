const jwt = require("jsonwebtoken");
const User = require("../models/auth-modles");

const Authmiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        msg: "Token not provided",
      });
    }

    // Ensure token starts with "Bearer "
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        msg: "Invalid token format",
      });
    }

    const jwtoken = authHeader.replace("Bearer ", "").trim();

    let isverified;
    try {
      isverified = jwt.verify(jwtoken, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }

    const Userdata = await User.findOne({ email: isverified.email }).select(
      "-password"
    );

    if (!Userdata) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.token = jwtoken;
    req.user = Userdata;
    req.id = Userdata._id;

    next(); // Move to the next middleware
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

module.exports = Authmiddleware;
