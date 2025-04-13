const { Schema, model, default: mongoose } = require("mongoose");

const contactSchema = new Schema({
  username: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    trim: true,
    require: true,
  },
});

module.exports = model("contct", contactSchema);
