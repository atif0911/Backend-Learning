const express = require("express");

const {
  handleSignUpUserController,
  handleSigninUserController,
} = require("../Controller/user.controller");

const router = express.Router();

router.post("/signup", handleSignUpUserController);
router.post("/login", handleSigninUserController);

module.exports = router;
