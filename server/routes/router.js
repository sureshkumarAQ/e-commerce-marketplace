const express = require("express");
const controller = require("../controller/controller");

const route = express.Router();

route.post("/auth/register", controller.Register);
route.post("/auth/login", controller.Login);

module.exports = route;
