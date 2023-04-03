const express = require("express");
const userControllers = require("../controllers/userController");
const router = express.Router();

router.route("/signUp").post(userControllers.signUp);
router.route("/signIn").post(userControllers.signIn);

module.exports = router;
