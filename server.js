require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const profileRoute = require("./routes/profile");

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

app.use("/register", registerRoute);

//login

app.use("/login", loginRoute);

//profile page

app.use("/profile", profileRoute);

app.listen(3001, () => {
  console.log("Server Running on port 3001");
});
