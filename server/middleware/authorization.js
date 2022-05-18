const jwt = require("jsonwebtoken");
var User = require("../models/user");
const cookieParser = require("cookie-parser");

const config = process.env;

const verifyToken = async (req, res, next) => {
  const token = req.headers.jwtoken;

  if (!token) {
    return res.status(401).send("Login required");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = user;
    // console.log(req.user._id);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
