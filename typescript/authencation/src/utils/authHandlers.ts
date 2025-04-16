import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
}

interface SessionPayload {
  id: string;
}

export const generateToken = (user: TokenPayload, session: SessionPayload) => {
  const accessTokenSecret = process.env.JWT_ACCESS_TOKEN;
  const refreshTokenSecret = process.env.JWT_REFRESH_KEY;
  const forgetPasswordToken = process.env.JWT_FORGET_KEY;

  if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error(
      "JWT secrets are not configured. Please check your environment variables."
    );
  }

  if (!forgetPasswordToken) {
    throw new Error("Forgot psw secret key not found");
  }

  const accessToken = jwt.sign(
    { email: user.email, id: user.id },
    accessTokenSecret,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, sessionId: session.id },
    refreshTokenSecret,
    { expiresIn: "7d" }
  );

  const forgetPassword = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    forgetPasswordToken,
    { expiresIn: "2h" }
  );

  return { accessToken, refreshToken, forgetPassword };
};
