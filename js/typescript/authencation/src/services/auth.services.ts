import { Types } from "mongoose";
import User from "../models/user.model";

export const compareEmailAndUsername = (username: string, email: string) => {
  return User.findOne({
    $or: [{ username }, { email }],
  });
};

export const findUserById = (id: string | Types.ObjectId) => {
  return User.findById(id)
};

export default { compareEmailAndUsername, findUserById };
