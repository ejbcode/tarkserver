const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
    trim: true,
  },
  password: { type: String, required: true, trim: true },

  registerdate: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model("User", UserSchema);
