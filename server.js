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

app.listen(3001, () => {
  console.log("Server Running on port 3001");
});
