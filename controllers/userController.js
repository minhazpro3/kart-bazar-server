const userSchema = require("../schemas/userSchema");
const mongoose = require("mongoose");
const User = new mongoose.model("user", userSchema);

exports.signUp = async (req, res, next) => {
  res.send("function is working");
};
