const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { check } = require("express-validator");

//url api/users
router.post(
  "/",
  [
    check("name", "The name is require").not().isEmpty(),
    check("email", "Please insert a valid email").isEmail(),
    check("password", "password must be at least 5 chars long").isLength({
      min: 5,
    }),
  ],

  userController.createUser
);

module.exports = router;
