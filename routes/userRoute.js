const express = require("express");
const userControllers = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/signUp").post(userControllers.signUp);
router.route("/signIn").post(userControllers.signIn);
router.route("/getUsers").get(authMiddleware, userControllers.getUsers);

module.exports = router;
