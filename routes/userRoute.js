const express = require("express");
const userControllers = require("../controllers/userController");
const router = express.Router();

router.route("/").post(userControllers.signUp);

module.exports = router;
