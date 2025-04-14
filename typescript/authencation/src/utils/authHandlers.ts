import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
}

export const generateToken = (user: TokenPayload) => {
  const accessTokenSecret = process.env.JWT_ACCESS_TOKEN;
  const refreshTokenSecret = process.env.JWT_REFRESH_KEY;

  if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error(
      "JWT secrets are not configured. Please check your environment variables."
    );
  }

  const accessToken = jwt.sign(
    { email: user.email, id: user.id },
    accessTokenSecret,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign({ id: user.id }, refreshTokenSecret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
