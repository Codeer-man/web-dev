import User from "../models/user.model";

const compareEmailAndUsername = (username: string, email: string) => {
  return User.findOne({
    $or: [{ username }, { email }],
  });
};

export default compareEmailAndUsername;
