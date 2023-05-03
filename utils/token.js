var jwt = require("jsonwebtoken");
exports.generateToken = (userInfo) => {
  const payload = {
    email: userInfo[0].email,
    userId: userInfo[0]._id,
  };

  const token = jwt.sign(payload, process.env.JWT_Sk, { expiresIn: "20s" });
  return token;
};
