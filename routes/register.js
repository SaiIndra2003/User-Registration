const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../Schema/User");

const Router = express.Router();

Router.post("/", async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    const foundMail = await User.findOne({ email: req.body.email });
    if (foundUser) {
      console.log(foundUser);
      return res.status(409).json({
        message: "User Exist",
      });
    } else if (foundMail) {
      console.log(foundMail);
      return res.status(409).json({
        message: "User with mail id " + foundMail.email + " already exist",
      });
    } else {
      const data = req.body.password;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data, saltRounds);

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        username: req.body.username,
        password: hashedPassword,
      });

      await user.save();

      console.log(user);
      return res.status(201).json({
        message: "User created succesfully...",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Registration failed",
      error: err,
    });
  }
});

module.exports = Router;
