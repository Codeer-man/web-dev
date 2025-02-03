const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// register controller
const registerUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    // check existing username and email

    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        sucess: false,
        message: "user already exists. Please try different username or email",
      });
    }

    // hash user password
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(password, salt);
    const hashedPassword = await hashPassword(password);

    const newCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newCreatedUser.save();

    if (newCreatedUser) {
      res.status(201).json({
        sucess: true,
        message: "New User has been created",
        data: newCreatedUser,
      });
    } else {
      res.status(400).json({
        sucess: false,
        message: "something wrong in create User",
      });
    }
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).json({
      sucess: false,
      message: "Invalid server error",
    });
  }
};

// login controller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if useename exist
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "username not found",
        sucess: false,
      });
    }
    //   check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "invalid credentials",
        sucess: false,
      });
    }

    // generate token

    const acesstoken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    // const accessToken = generateToken(user);

    return res.status(200).json({
      sucess: true,
      message: "Logged in sucessfully",
      acesstoken,
    });
  } catch (error) {
    console.log("something went wrong", error);
    return res.status(500).json({
      sucess: false,
      message: "Invalid server error",
    });
  }
};

module.exports = { registerUser, loginUser };
