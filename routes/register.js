const express = require("express");

const registerController = require("../controllers/register");

const Router = express.Router();

Router.post("/", registerController.register_user);

module.exports = Router;
