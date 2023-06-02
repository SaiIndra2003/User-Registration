require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("./Schema/User");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(process.env.MY_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Atlas-MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Handle cors error

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Registration

app.post("/register", async (req, res, next) => {
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

//login

app.post("/login", async (req, res, next) => {
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

//profile page

app.get("/profile", async (req, res, next) => {
  try {
    const userId = req.cookie.userId;
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      return res.status(500).json({
        message: "Unauthorized",
      });
    } else {
      console.log("Sending user details.....");
      return res.status(201).json({
        message: "Sending user details..",
        data: {
          name: foundUser.name,
          email: foundUser.email,
          contact: foundUser.contact,
          username: foundUser.username,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

//patch
app.patch("/profile", async (req, res, next) => {
  try {
    const userId = "647a3030e2ca71d74154fc08";
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      return res.status(500).json({
        message: "Unauthorized",
      });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: req.body },
        { new: true }
      );
      return res.status(201).json({
        message: "Data Updated....",
        data: {
          name: foundUser.name,
          email: foundUser.email,
          contact: foundUser.contact,
          username: foundUser.username,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

app.listen(3001, () => {
  console.log("Server Running on port 3001");
});
