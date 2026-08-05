export type UserRole = "USER" | "ADMIN";

export type user = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  createdAt: Date;
};

export type jwtPayload = {
  userId: string;
  role: UserRole;
};
