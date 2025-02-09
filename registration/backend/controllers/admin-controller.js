const User = require("../models/auth-modles");
const contct = require("../models/contact-models");
const Service = require("../models/service");

const getalluser = async (req, res, next) => {
  try {
    const user = await User.find().select("-password");
    if (!user || user.length === 0) {
      res.status(500).json({
        message: "user not found",
      });
    }

    return res.status(200).json({
      msg: "Data are here",
      data: user,
    });
  } catch (error) {
    console.log("Invalid server error", error);
    res.status(500).json({
      msg: "invalid server error",
      error: error,
    });
    next(error);
  }
};

const getallcontact = async (req, res, next) => {
  try {
    const contact = await contct.find();
    if (!contact || contact.length === 0) {
      res.status(500).json({
        message: "contact not found",
      });
    }

    return res.status(200).json({
      msg: "Data are here",
      data: contact,
    });
  } catch (error) {
    console.log("Invalid server error", error);
    res.status(500).json({
      msg: "invalid server error",
      error: error,
    });
    next(error);
  }
};

module.exports = { getalluser, getallcontact };
