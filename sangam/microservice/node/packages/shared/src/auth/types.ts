export type UserRole = "USER" | "ADMIN";

export type jwtPayload = {
  userId: string;
  role: UserRole;
};
