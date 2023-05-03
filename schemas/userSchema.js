const mongoose = require("mongoose");
const validator = require("validator");

// signup schema
const signupSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email address is required"],
    validate: [validator.isEmail, "Please provide a valid E-mail"],
    trim: true,
    unique: [true, "Please provide another email address"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minLength: 8,
  },
});

const signupModal = mongoose.model("users", signupSchema);

module.exports = signupModal;

// signIn schema
// const signInSchema = mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, "Email address is required"],
//     validate: [validator.isEmail, "Please provide a valid E-mail"],
//     trim: true,
//     lowercase: true,
//     maxLength: 30,
//     minLength: [8, "please provide min 8 length"],
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//     trim: true,
//     minLength: 8,
//   },
// });

// module.exports = signInSchema;
