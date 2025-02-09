const User = require("../models/auth-modles");

const isAdmin = async (req, res, next) => {
  try {
    // const {role} = req.body
    if (User.role === "User") {
      return res.status(400).json({
        message: "only Admin are allowed in this page",
      });
    }
    next();
  } catch (error) {
    next(error);
    res.status(400).json({
      error: error,
    });
  }
};
module.exports = isAdmin;
