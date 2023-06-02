const express = require("express");

const loginController = require("../controllers/login");

const Router = express.Router();

Router.post("/", loginController.login);

module.exports = Router;
