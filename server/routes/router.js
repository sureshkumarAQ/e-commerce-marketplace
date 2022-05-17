const express = require("express");
const authController = require("../controller/authController");
const sellerController = require("../controller/sellerController");
const buyerController = require("../controller/buyerController");
const authorization = require("../middleware/authorization");

const route = express.Router();

// These routes for auth
route.post("/auth/register", authController.Register);
route.post("/auth/login", authController.Login);

// These routes for seller

route.post(
  "/seller/create-catalog",
  authorization,
  sellerController.createCatalog
);

// These routes for buyer

module.exports = route;
