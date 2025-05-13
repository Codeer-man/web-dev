const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      require: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    expireAt: {
      type: Date,
      require: true,
    },
  },
  { timeseries: true }
);

RefreshTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const RegisterToken = mongoose.model("Refresh", RefreshTokenSchema);

module.exports = RegisterToken;
