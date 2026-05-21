const express = require("express");

const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} = require("../controller/auth.controller");

const {
  validateRegister,
  validateLogin,
} = require("../validators/auth.validator");

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);

module.exports = router;
