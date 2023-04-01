const userSchema = require("../schemas/userSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = new mongoose.model("users", userSchema);

// user signup
exports.signUp = async (req, res, next) => {
  try {
    // password hashed
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    // users objects data
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    const result = await newUser.save();
    //response from
    res.status(200).send({
      status: "success!",
      message: result,
    });
    // any error
  } catch (error) {
    res.status(400).send({
      status: "failed!",
      message: error.message,
    });
  }
};
