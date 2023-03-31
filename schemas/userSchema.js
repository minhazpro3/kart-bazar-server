const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    lowercase: true,
    unique: true,
    maxLength: 30,
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    validate: [validator.isEmail, "Please provide a valid E-mail"],
    trim: true,
    lowercase: true,
    unique: true,
    maxLength: 30,
    minLength: 15,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minLength: 8,
  },
  status: {
    type: String,
    enum: ["active", "in-active"],
    default: "active",
  },
});

module.exports = userSchema;
