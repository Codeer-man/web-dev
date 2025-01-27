const User = require("../models/user-model.js");

const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.error("Error in home route:", error); // Improved logging
    res.status(500).json({ msg: "Internal server error" });
  }
};

const register = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging request body
    const { username, email, phone, password } = req.body;

    // Validate input fields
    if (!username || !email || !phone || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if the user already exists
    const UserExist = await User.findOne({ email });
    if (UserExist) {
      return res
        .status(400)
        .json({ msg: "User already exists with this email" });
    }

    // Create a new user
    const UserCreated = new User({ username, email, phone, password });

    // Generate the token
    const token = await UserCreated.generateAuthToken();

    // Save the user to the database
    await UserCreated.save();

    // Send response
    return res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: UserCreated._id,
        username: UserCreated.username,
        email: UserCreated.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error); // Improved logging
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

module.exports = { home, register };
