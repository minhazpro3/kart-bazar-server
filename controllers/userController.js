const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const signupModal = require("../schemas/userSchema");

// user signup
exports.signUp = async (req, res, next) => {
  try {
    // password hashed
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    // users objects data

    const signupModel = new signupModal({
      email: req.body.email,
      password: hashPassword,
    });

    console.log(signupModel);

    const existMail = await signupModal.find({ email: req.body.email });

    if (existMail[0]?.email) {
      return res.status(401).json({
        status: false,
        message: 'User already exist "Login please"',
      });
    }

    if (hashPassword) {
      const result = await signupModel.save();

      res.send(result);
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
    const isUser = await SignupModel.find({ email: req.body.email });
    if (isUser.length > 0) {
      const isValidation = await bcrypt.compare(
        req.body.password,
        isUser[0].password
      );

      if (isValidation) {
        // generate token

        const token = jwt.sign(
          {
            email: isUser[0].email,
            userId: isUser[0]._id,
          },
          process.env.JWT_Sk
        );

        res.status(200).send({
          status: true,
          message: "Login success",
          token: token,
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
