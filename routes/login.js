const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Schema/User");

const Router = express.Router();

Router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ username: username });

    if (!foundUser) {
      return res.status(404).json({
        message: "User not Found",
      });
    } else {
      const match = await bcrypt.compare(password, foundUser.password);

      if (match) {
        res.cookie("userId", foundUser._id, {
          httpOnly: true,
          maxAge: 10 * 60 * 1000,
        });

        return res.status(201).json({
          message: "User found!!...",
        });
      } else {
        return res.status(404).json({
          message: "Login failed...!!",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Login failed...",
    });
  }
});

module.exports = Router;
