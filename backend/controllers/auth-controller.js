const User = require("../models/user-model.js");

const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Invalid server error" });
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const UserExist = await User.findOne({ email });

    if (UserExist) {
      return res
        .status(400)
        .json({ msg: "User already exists with this email" });
    }

    const UserCreated = await User.create({ username, email, phone, password });
    return res
      .status(201)
      .json({ msg: "User registered successfully", user: UserCreated });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

module.exports = { home, register };
