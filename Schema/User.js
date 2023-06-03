const mongoose = require("mongoose");

const UserSchemma = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /\S+@\S+\.\S+/,
  },
  contact: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Transgender"],
    required: true,
  },
  dateofbirth: {
    type: String,
    required: true,
    match: /^[0-9]{1,2}\-[0-9]{1,2}\-[0-9]{4,4}$/,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchemma);
