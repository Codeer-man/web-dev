const User = require("../models/auth-modles");

const registerUser = async (req, res) => {
  try {
    const { username, phone, password, email, role } = req.body;

    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "The email or username already exists",
      });
    }

    const newUser = new User({
      username,
      email,
      password,
      phone,
      role: role || "User",
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "New user has been created",
      data: newUser,
    });
  } catch (error) {
    console.error("Something went wrong", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username not found, please try again",
      });
    }

    const isPasswordMatch = await user.ComparePassword(password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate JWT token after successful authentication
    const token = await user.generateToken();

    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      token,
      userId: user._id.toString(),
    });
  } catch (error) {
    console.error("Something went wrong", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { registerUser, loginUser };
