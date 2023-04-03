const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const SignupModel = require("../schemas/userSchema");
// user signup
exports.signUp = async (req, res, next) => {
  try {
    // password hashed
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    // users objects data

    const signupModel = new SignupModel({
      email: req.body.email,
      password: hashPassword,
    });

    const existMail = await SignupModel.find({ email: req.body.email });
    console.log(existMail[0]);

    if (existMail[0]?.email) {
      return res.status(401).json({
        status: false,
        message: "User already exist",
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
      message: "Authentication failed",
    });
    console.log(error.message);
  }
};

// signIn user
// exports.signIn = async (req, res, next) => {
//   try {
//     const isUser = await User.find({ email: req.body.email });
//     if (isUser.length > 0) {
//       const isValidation = await bcrypt.compare(
//         req.body.password,
//         isUser[0].password
//       );
//       if (isValidation) {
//         // generate token

//         const token = jwt.sign(
//           {
//             name: isUser[0].name,
//             userId: isUser[0]._id,
//           },
//           process.env.JWT_Sk
//         );

//         res.status(200).send({
//           status: true,
//           access_token: token,
//           message: "Login success",
//         });
//       }
//     } else {
//       res.status(401).json({
//         status: false,
//         message: "Authenticate fail!",
//       });
//     }
//   } catch (error) {
//     res.status(401).json({
//       status: false,
//       message: "Authenticate fail!",
//     });
//   }
// };
