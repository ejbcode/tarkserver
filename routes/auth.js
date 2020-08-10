const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controller/authController");

//url api/auth
router.post(
  "/",
  [
    check("email", "Please insert a valid email").isEmail(),
    check("password", "password must be at least 5 chars long").isLength({
      min: 5,
    }),
  ],
  authController.authUser
);

module.exports = router;
