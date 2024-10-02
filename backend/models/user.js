const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "please Enter username"],
    minLength: [4, "Username must be more than 4 chracters"],
  },
  email: {
    type: String,
    required: [true, "please Enter your email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "password cannot be blank"],
    minLength: [8, "Password must be more than 8 characters"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    default: "USER",
  },
  refferalCode: {
    type: String,
    unique: true,
  },
  refferdBy: {
    type: String,
  },
  points: {
    type: Number,
    default: 0,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const user = mongoose.model("user", userSchema);

module.exports = user;
