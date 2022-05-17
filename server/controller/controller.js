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

exports.Login = async (req, res) => {};
