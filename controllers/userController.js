const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const signupModal = require("../schemas/userSchema");
const { generateToken } = require("../utils/token");
const { authMiddleware } = require("../middleware/authMiddleware");

// user signup
exports.signUp = async (req, res, next) => {
  try {
    // if (!req.body.email && !req.body.password) {
    //   return res.status(403).send({
    //     status: "false",
    //     message: "input is require",
    //   });
    // }
    // password hashed
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    // users objects data

    const signupModel = new signupModal({
      email: req.body.email,
      password: hashPassword,
    });

    const existMail = await signupModal.find({ email: req.body.email });

    if (existMail[0]?.email) {
      return res.status(401).json({
        status: false,
        message: 'User already exist Login please',
      });
    }

    if (hashPassword) {
      const result = await signupModel.save();

      const token = generateToken(result._id);
      if (result) {
        res.status(200).send({
          status: true,
          message: "Successfully signUp",
          email: result.email,
          _id: result._id,
          token: token,
        });
      }
    }

    // any error
  } catch (error) {
    res.status(401).send({
      status: "failed!",
      message: error.message,
    });
  }
};

// signIn user
exports.signIn = async (req, res, next) => {
  try {
    const isUser = await signupModal.findOne({ email: req.body.email });

    if (isUser) {
      const isValidation = await bcrypt.compare(
        req.body.password,
        isUser.password
      );
      console.log(isValidation);
      if (isValidation) {
        // generate token
        const token = generateToken(isUser);
        res.status(200).send({
          status: true,
          message: "Login success",
          token: token,
        });
      } else {
        res.status(401).json({
          status: false,
          message: "Provide valid email or password",
        });
      }
    } else {
      res.status(401).json({
        status: false,
        message: "Authenticate fail!",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Authenticate fail!",
    });
  }
};

// get all users

exports.getUsers = async (req, res, next) => {
  try {
    console.log(req.user);
    const users = await signupModal.find({});
    res.send(users);
  } catch (error) {}
};
