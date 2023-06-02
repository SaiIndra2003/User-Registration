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

app.post("/register", async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 6);

    const user = new User({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      username: req.body.username,
      password: password,
    });

    await user.save();

    res.status(201).json({
      message: "User created succesfully...",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Registration failed",
      error: err,
    });
  }
});

app.listen(3001, () => {
  console.log("Server Running on port 3001");
});
