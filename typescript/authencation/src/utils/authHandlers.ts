import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
}

export const generateToken = (user: TokenPayload) => {
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
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign({ id: user.id }, refreshTokenSecret, {
    expiresIn: "7d",
  });

  const forgetPassword = jwt.sign(
    {
      email: user.email,
    },
    forgetPasswordToken,
    { expiresIn: "2h" }
  );

  return { accessToken, refreshToken, forgetPassword };
};
