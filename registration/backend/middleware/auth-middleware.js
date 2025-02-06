const jwt = require("jsonwebtoken");
const User = require("../models/auth-modles");

const Authmiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      res.status(401).json({
        msg: "token not provided or received",
      });
    }
    const jwtoken = token.replace("Bearer", "").trim();

    const isverified = jwt.verify(jwtoken, process.env.JWT_SECRET_KEY);

    const Userdata = await User.findOne({ email: isverified.email }).select({
      password: 0,
    });

    if (!Userdata) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(Userdata);

    req.token = token;
    req.user = Userdata;
    req.id = Userdata._id;

    next();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "invalid server error",
    });
  }
};

module.exports = Authmiddleware;
