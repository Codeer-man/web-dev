//npm i google-auth-library  package

import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { User } from "../../model/user.model";
import crypto from "crypto";
import { hashPassword } from "../../lib/hash";
import { createAccessToken, createRefreshToken } from "../../lib/token";
import { authenticator } from "otplib";

function getGoogleClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret) {
    throw new Error("Google client credentials not found or received");
  }

  return new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri,
  });
}

export async function googleAuthStartHandler(_req: Request, res: Response) {
  try {
    const client = getGoogleClient();

    const url = client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: ["openid", "email", "profile"],
    });

    return res.redirect(url);
  } catch (error) {
    return res.status(500).json({
      message: "Invalid server error",
      error: error,
    });
  }
}

export async function googleAuthCallbackHanlder(req: Request, res: Response) {
  const code = req.query.code as string | undefined;

  if (!code) {
    return res.status(400).json({
      message: "Missing code in callback",
    });
  }
  try {
    const client = getGoogleClient();

    const { tokens } = await client.getToken(code);

    if (!tokens.id_token) {
      return res.status(400).json({
        message: "No google id_token is present",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload();

    const email = payload?.email;
    const emailVerified = payload?.email_verified;

    if (!email || !emailVerified) {
      return res.status(400).json({
        message: "Google email account is not verified",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      const randomPwd = crypto.randomBytes(16).toString("hex");
      const passwordHash = await hashPassword(randomPwd);

      user = await User.create({
        email: normalizedEmail,
        password: passwordHash,
        role: "user",
        isEmailVerified: true,
        twoFactorEnabled: false,
      });
    } else {
      if (!user.isEmailVerified) {
        user.isEmailVerified = true;
        await user.save();
      }
    }

    const accessToken = createAccessToken(
      user.id,
      user.role as "user",
      user.tokenVersion
    );

    const refreshToken = createRefreshToken(user.id, user.tokenVersion);

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Google login successfult",
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Missing code in callback",
      error: error,
    });
  }
}

export async function twoFASetupHandler(req: Request, res: Response) {
  const authReq = req as any;
  const authUser = authReq.user;

  if (!authUser) {
    return res.status(401).json({
      message: "User not authenticated",
    });
  }

  try {
    const user = await User.findById(authUser.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const secret = authenticator.generateSecret();

    const issuer = "NodeAdvancedAuthApp";

    const otpAuthUrl = authenticator.keyuri(user.email, issuer, secret);

    user.twoFactorSecret = secret;
    user.twoFactorEnabled = false;

    await user.save();

    return res.json({
      message: "2FA setup is enabled",
      otpAuthUrl,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Missing code in callback",
      error: error,
    });
  }
}

export async function twoFA_VerifyHandler(req: Request, res: Response) {
  const authReq = req as any;
  const authUser = authReq.user;

  if (!authUser) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const { code } = req.body as { code?: string };

  if (!code) {
    return res.status(400).json({ message: "2FA code is required" });
  }

  try {
    const user = await User.findById(authUser.id);

    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({ message: "2FA not setup yet" });
    }

    if (!user.twoFactorSecret) {
      return res.status(400).json({
        message: "You dont have 2fa setup yet.",
      });
    }

    const cleanCode = code.replace(/\s+/g, "");

    const isValid = authenticator.check(code, user.twoFactorSecret);

    console.log(isValid);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid 2FA code" });
    }

    user.twoFactorEnabled = true;
    await user.save();

    return res.status(200).json({
      message: "2FA enabled successfully",
      twoFactorEnabled: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
}
