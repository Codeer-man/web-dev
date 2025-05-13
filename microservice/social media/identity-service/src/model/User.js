const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchma = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

userSchma.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    this.password = await argon2.hash(this.password);
  } catch (error) {
    return next(error);
  }
});

userSchma.methods.comparePassword = async function (candidatePassword) {
  try {
    return await argon2.verify(this.password, candidatePassword);
  } catch (error) {
    throw new Error(error);
  }
};

userSchma.index({ usernameL: "text" });

const User = mongoose.model("User", userSchma);
module.exports = User;
