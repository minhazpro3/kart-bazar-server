var jwt = require("jsonwebtoken");
exports.generateToken = (userInfo) => {
  const payload = {
    email: userInfo.email,
    userId: userInfo._id,
  };

  const token = jwt.sign(payload, process.env.JWT_Sk, { expiresIn: "60s" });
  return token;
};
