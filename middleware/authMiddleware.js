const jwt = require("jsonwebtoken");
const signupModal = require("../schemas/userSchema");
const { promisify } = require("util");

exports.authMiddleware = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers?.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_Sk);
    req.user = decoded;
    if (!token) {
      res.status(403).send({
        status: false,
        message: "Authenticate fail",
      });
    }
    next();
  } catch (error) {
    res.send("authentication fail");
  }
};
