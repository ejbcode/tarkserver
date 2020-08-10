const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //check if the user is registerd
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User is not registered" });
    }

    const passOK = await bcryptjs.compare(password, user.password);
    if (!passOK) {
      return res.status(400).json({ msg: "Password incorrect" });
    }

    //if all ok,create and sign the JWT
    const payload = {
      user: { id: user.id },
    };

    //sign the token
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
