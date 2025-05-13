const logger = require("../utils/logger");
const { validateRegistration, validatelogin } = require("../utils/validation");
const User = require("../model/User");
const ErrorHandling = require("../utils/ErrorHandling");
const generateToken = require("../utils/GenerateToken");
const RegisterToken = require("../model/RefreshToken");

// user registration
const userRegister = async (req, res, next) => {
  logger.info("Register endpoint hit....");
  try {
    // validate schema
    const { error } = validateRegistration(req.body);
    if (error) {
      logger.warn("validation error", error.details[0].message);
      throw new Error(error.details[0].message, 400, false);
    }
    const { email, username, password } = req.body;

    const findUser = await User.findOne({ $or: [{ email }, { username }] });
    if (findUser) {
      logger.warn("User Already Exist");
      throw new Error("User already exists", 401, false);
    }

    const user = new User({
      email,
      username,
      password,
    });

    await user.save();
    logger.warn("New User has been created", user._id);

    const { accessToken, refreshToken } = await generateToken(user);
    console.log(user);

    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    logger.info("User Registered Successfully");
  } catch (error) {
    logger.error("Registration Error", error);
    next(error);
  }
};

// user login
const userLogin = async (req, res, next) => {
  logger.info("user login endpoint hit...");

  try {
    const { error } = validatelogin(req.body);
    if (error) {
      logger.warn("validation error", error.details[0].message);
      throw new Error(error.details[0].message, 400, false);
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      logger.warn("Invalid username");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      logger.warn("Invalid credentials");
      return res.status(404).json({
        success: false,
        message: "Invalid password",
      });
    }

    const { accessToken, refreshToken } = await generateToken(user);

    logger.info("user logged in");
    return res.status(201).json({
      success: true,
      message: "User logged in",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error("login Error", error);
    next(error);
  }
};

// refresh token
const refreshToken = async (req, res, next) => {
  logger.info("Refresh Token hit...");

  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      logger.warn("refreshToken not found");
      return res.status(404).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const storeToken = await RegisterToken.findOne({ token: refreshToken });

    if (!storeToken || storeToken.RegisterToken < new Date()) {
      logger.warn("Invalid or expired refresh token");
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }
    const user = await User.findById(storeToken.user);

    if (!user) {
      logger.warn("user not found");
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    const { accessToken: newaAccessToken, refreshToken: newrefreshToken } =
      await generateToken(user);

    await RegisterToken.deleteOne({ _id: storeToken._id });

    logger.info("new refresh token generated");
    return res.status(200).json({
      success: true,
      newrefreshToken,
      newaAccessToken,
    });
  } catch (error) {
    logger.error("refresh access  Error", error);
    next(error);
  }
};

// user logout
const logoutUser = async (req, res, next) => {
  logger.info("Logger endpoint hit...");

  try {
    const { refreshToken } = req.body;

    const findToken = await RegisterToken.findOne({ token: refreshToken });
    if (!refreshToken) {
      logger.warn("Token not found");
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }
    await RegisterToken.deleteOne({ token: refreshToken });

    logger.info("Token deleted and use logged out");
    res.status(200).json({
      success: true,
      message: "User logged out",
    });
  } catch (error) {
    logger.error("logoutError Error", error);
    next(error);
  }
};

module.exports = { userRegister, userLogin, refreshToken, logoutUser };
