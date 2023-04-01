const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    unique: [true, "Name must be unique"],
    lowercase: true,
    maxLength: 30,
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    validate: [validator.isEmail, "Please provide a valid E-mail"],
    trim: true,
    unique: [true, "Email must be unique"],
    lowercase: true,
    maxLength: 30,
    minLength: [8, "please provide min 15 length"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minLength: 8,
  },
});

module.exports = userSchema;
