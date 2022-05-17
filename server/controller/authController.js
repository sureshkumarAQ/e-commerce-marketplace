const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

//Create and save new user
exports.Register = async (req, res) => {
  try {
    //Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty" });
      return;
    }

    // Store all data in user object
    const user = await new User({
      username: req.body.username,
      password: req.body.password,
      type: req.body.type,
    });

    // zwt create a new tokken
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //save user token
    user.token = token;

    // Save user in the database
    await user
      .save(user)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating a a new account",
        });
      });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating a a new account",
    });
  }
};

// Login a user
exports.Login = async (req, res) => {
  //get user data
  try {
    //validate request
    if (!req.body) {
      res.status(400).send({ message: "Fill username and password" });
      return;
    }

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password)
      return res.status(406).send({ err: "Not all field have been entered" });

    // Check if user is already exist or not
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(406)
        .send({ err: "No account found with this username" });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(406).send({ err: "Invalid Credentials" });

    // zwt create a new tokken
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //save user token
    user.token = token;

    //Store jwt-token in cookie
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.send({ jwtToken: token });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while login",
    });
  }
};
