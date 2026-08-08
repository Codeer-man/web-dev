import { AppError, signToken } from "shared";
import { authRepo } from "../repo/user.repo";
import { LoginInput, RegisterInput } from "../schema/auth.schema";
import bcrypt from "bcryptjs";
import { user } from "../types/auth.type";

export async function register(input: RegisterInput): Promise<user> {
  const existingEmail = await authRepo.findByEmail(input.email);

  if (existingEmail) {
    throw new AppError(409, "user email already exists");
  }

  const hashPassword = await bcrypt.hash(input.password, 10);

  const createUser = await authRepo.createUser({
    email: input.email,
    name: input.name,
    passwordHash: hashPassword,
    role: "USER",
  });

  return createUser;
}

export async function login(input: LoginInput) {
  const findUser = await authRepo.findByEmail(input.email);

  if (!findUser) {
    throw new AppError(401, "Invalid email or password");
  }

  const valid = await bcrypt.compare(input.password, findUser.password_hash);

  if (!valid) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = signToken({ userId: findUser.id, role: findUser.role });

  return {
    token: `Bearer ${token}`,
    findUser,
  };
}

export async function getMe(userId: string) {
  const user = await authRepo.findById(userId);

  if (!user) {
    throw new AppError(404, "user not found");
  }

  return user;
}
