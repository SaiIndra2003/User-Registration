const express = require("express");

const profileController = require("../controllers/profile");

const Router = express.Router();

Router.get("/", profileController.get_user_profile);

Router.patch("/", profileController.update_user_profile);

module.exports = Router;
