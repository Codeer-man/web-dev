import { NextFunction, Request, Response, text } from "express";
import User from "../models/user.model";
import { compareEmailAndUsername } from "../services/auth.services";
import { generateToken } from "../utils/authHandlers";
import { ErrorHandler } from "../utils/errorHandler";
import { sendverificationMail } from "../services/mail.services";
import jwt from "jsonwebtoken";
import Session from "../models/session";

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const User = (req as any).user;

    if (!User) {
      throw new ErrorHandler("User not found in the controller ", 401, false);
    }
    console.log(User);

    res.status(200).json({ sucess: false, message: "User found", data: User });
  } catch (error) {
    next(error);
  }
};

export const authRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new ErrorHandler("All fields are required", 400, true);
    }

    const userExist = await compareEmailAndUsername(username, email);

    if (userExist) {
      throw new ErrorHandler("Username or email already exists", 400, false);
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    try {
      // Send verification email
      const verificationOtp = await sendverificationMail(newUser);
      newUser.otp = verificationOtp;
      await newUser.save();

      res.status(201).json({
        success: true,
        message: "Registration successful. Check your email for verification.",
        data: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (emailError) {
      await User.deleteOne({ _id: newUser._id });
      throw new ErrorHandler("Failed to send verification email", 500, false);
    }
  } catch (error) {
    next(error);
  }
};

export const authLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const user = await compareEmailAndUsername(username, email);
    if (!user)
      throw new ErrorHandler("Username or email not found", 401, false);

    const correctPassword = await user.comparePassword(password);
    if (!correctPassword)
      throw new ErrorHandler("Password does not match", 401, false);

    // Create session
    const session = await Session.create({
      userId: user._id,
      userAgent: req.headers["user-agent"],
    });

    const { accessToken, refreshToken } = generateToken(
      { id: user._id.toString(), email: user.email },
      { id: session.id.toString() }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

    res.status(200).json({
      success: true,
      message: "User logged in",
      data: user,
      accessToken: accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!refreshToken) {
      throw new ErrorHandler(
        "Refresh token not found in cookies or body",
        404,
        false
      );
    }

    if (!process.env.JWT_REFRESH_KEY) {
      throw new ErrorHandler("JWT secret keys are not set", 500, false);
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY) as {
      id: string;
      sessionId: string;
    };

    if (!decoded) {
      throw new ErrorHandler("Invalid token", 404, false);
    }

    console.log("Verified token", decoded);

    const findUser = await User.findById(decoded.id);

    if (!findUser) {
      throw new ErrorHandler("User not found", 404, false);
    } else if (findUser?.refreshToken !== refreshToken) {
      throw new ErrorHandler("Token not matched", 401, false);
    }

    const { accessToken } = generateToken(
      {
        id: findUser._id.toString(),
        email: findUser.email,
      },
      { id: sessionStorage.userId.toString() }
    );

    const options = {
      httponly: true,
      secure: true,
      maxAge: 15 * 60 * 1000,
    };

    res.clearCookie("accessToken", options);

    res.status(200).cookie("accessToken", accessToken, options).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new ErrorHandler("Refresh token not found", 400, false);
    }

    // Decode token to get sessionId
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY!) as {
      id: string;
      sessionId: string;
    };

    // Delete the session from the database
    await Session.findByIdAndDelete(decoded.sessionId);

    // Clear cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
