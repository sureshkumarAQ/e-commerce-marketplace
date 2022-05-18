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

route.get("/seller/orders", authorization, sellerController.getOrders);

// These routes for buyer

route.post(
  "/buyer/create-order/:seller_id",
  authorization,
  buyerController.createOrder
);

route.get("/buyer/list-of-sellers", authorization, buyerController.sellerList);

route.get(
  "/buyer/seller-catalog/:seller_id",
  authorization,
  buyerController.sellerCatalog
);

module.exports = route;
