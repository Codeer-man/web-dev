import { Request, Response } from "express";
import { loginSchame, registerSchema } from "./auth.schema";
import { User } from "../../model/user.model";
import { checkPassword, hashPassword } from "../../lib/hash";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../lib/emaill";
import { createAccessToken, createRefreshToken } from "../../lib/token";

const getAppUrl = () => {
  return process.env.APPT_URL || `http://localhost:${process.env.PORT}`;
};

export async function registerHandler(req: Request, res: Response) {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).jsonp({
        message: "Invalid data!",
        error: result.error.flatten(),
      });
    }

    const { email, password, name } = result.data;

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exist! Please try a different email",
      });
    }

    const passwordHash = await hashPassword(password);

    const newlyCreatedUser = await User.create({
      email: normalizedEmail,
      password: passwordHash,
      name,
      role: "user",
      isEmailVerified: false,
      twoFactorEnabled: false,
    });

    //email verification

    const verifyToken = jwt.sign(
      {
        sub: newlyCreatedUser.id,
      },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    const verifyUrl = `${getAppUrl()}/api/auth/verify-email?token=${verifyToken}`;

    await sendEmail(
      newlyCreatedUser.email,
      "verify your Email",
      `
      <p>Pleaes verify your email </p>
      <p><a href="${verifyUrl}"> ${verifyUrl} <a/> <p/>
      `
    );

    return res.status(201).json({
      message: " User Registered",
      user: {
        id: newlyCreatedUser.id,
        email: newlyCreatedUser.email,
        role: newlyCreatedUser.role,
        verifyEmail: newlyCreatedUser.isEmailVerified,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
}

export async function emailVerifyHandler(req: Request, res: Response) {
  const token = req.query.token as string | undefined;

  if (!token) {
    return res.status(400).json({
      message: "Token is not provided",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      sub: string;
    };

    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    if (user.isEmailVerified) {
      return res.json({
        message: "Email is already verified",
      });
    }

    user.isEmailVerified = true;
    await user.save();

    return res.status(201).json({
      message: "Email is Verified.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Invalid server error",
      error,
    });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const result = loginSchame.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid data!",
        error: result.error.flatten(),
      });
    }

    const { email, password } = result.data;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({
        message: "Email does not exist",
      });
    }

    const pwd = await checkPassword(password, user.password);

    if (!pwd) {
      return res.status(400).json({
        message: "The passwoed does not match",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: "Your email is not verified",
      });
    }

    const accessToken = createAccessToken(
      user.id,
      user.role,
      user.tokenVersion
    );

    const refreshToken = createRefreshToken(user.id, user.tokenVersion);

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      messager: "login successfull",
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        twoFactorEnable: user.twoFactorEnabled,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Invalid server error",
      error,
    });
  }
}
