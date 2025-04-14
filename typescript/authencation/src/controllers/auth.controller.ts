import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import compareEmailAndUsername from "../services/auth.services";
import { generateToken } from "../utils/authHandlers";
import { ErrorHandler } from "../utils/errorHandler";

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

    res.status(201).json({
      sucess: true,
      message: "New user has been created",
      data: newUser,
    });
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

    if (!user) {
      throw new ErrorHandler("Username or email not found", 401, false);
    }

    const correctPassword = await user.comparePassword(password);

    if (!correctPassword) {
      throw new ErrorHandler("Password doesnot match", 500, false);
    }

    const { accessToken, refreshToken } = generateToken({
      id: user._id.toString(),
      email: user.email,
    });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    console.log(user, accessToken);

    res.status(201).json({
      sucess: true,
      message: "User logged In",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
