const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //reading token from header
  const token = req.header("x-auth-token");

  //check if the petition contains a tokern
  if (!token) {
    return res.status(401).json({ msg: "there is no token" });
  }

  //validate the token

  try {
    const tokenauth = jwt.verify(token, process.env.SECRET);
    req.user = tokenauth.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "the token is invalid" });
  }
};
