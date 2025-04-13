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

const DeleteContact = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const ContactDelete = await contct.findByIdAndDelete(_id);

    if (!ContactDelete) {
      console.log("No user found");
      return res.status(404).json({
        message: "User not ofund",
      });
    }
    return res.status(200).json({
      message: "User has been deleted",
    });
  } catch (error) {
    console.log("Invalid server error", error);
    res.status(500).json({
      msg: "No user found",
      error: error,
    });
    next(error);
  }
};
const DeleteUser = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const UserDelete = await User.findByIdAndDelete(_id);

    if (!UserDelete) {
      console.log("No user found");
      return res.status(404).json({
        message: "User not ofund",
      });
    }
    return res.status(200).json({
      message: "User has been deleted",
    });
  } catch (error) {
    console.log("Invalid server error", error);
    res.status(500).json({
      msg: "No user found",
      error: error,
    });
    next(error);
  }
};

const UpdatedUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateUserdata = req.body;

    const updateUser = await User.findByIdAndUpdate(id, updateUserdata, {
      new: true,
    });

    if (!updateUser) {
      console.log("use not found");
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "Data sucessfully updated",
      data: updateUser,
    });
  } catch (error) {
    console.log("User Id is requires");
    return next(error);
  }
};

module.exports = {
  getalluser,
  getallcontact,
  DeleteUser,
  UpdatedUser,
  DeleteContact,
};
