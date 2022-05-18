const Catalog = require("../models/catalog.js");
const Order = require("../models/order.js");
const User = require("../models/user.js");

exports.createOrder = async (req, res) => {
  try {
    if (!req.body.products) {
      res
        .status(400)
        .send({ message: "Please add at least one product in your order" });
    }

    const userID = req.user._id;
    const selllerID = req.params.seller_id;

    const user = await User.findById({ _id: userID });

    // console.log(user.type);
    // If loggedin user is a seller we cannot allow to place order
    if (user.type === "seller") {
      res.status(400).send({
        message: "A seller cannot place order. Please login with buyer account",
      });
    }

    // productName is a array or products which buyer want to buy from seller
    const productName = req.body.products.productName;

    // We can also check first that the seller catalog have all products or not but here we assume that buyer order only that products which are present in seller catalog

    const products = { productName };

    const order = await new Order({
      products: products,
      seller: selllerID,
      buyer: userID,
    });

    await order
      .save(order)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Order not placed",
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred order not placed",
    });
  }
};

exports.sellerList = async (req, res) => {
  try {
    const userID = req.user._id;

    const user = await User.findById({ _id: userID });

    // console.log(user.type);
    // If loggedin user is a seller we cannot allow to access other seller list
    if (user.type === "seller") {
      res.status(400).send({
        message:
          "A seller cannot access list of other seller. please login with buyer account",
      });
    }

    // List of seller with its catalog
    const seller = await Catalog.find()
      .select("-_id -__v")
      .populate("seller", ["username", "type"]);
    res.status(201).send(seller);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};

exports.sellerCatalog = async (req, res) => {
  try {
    const userID = req.user._id;
    const sellerID = req.params.seller_id;

    const user = await User.findById({ _id: userID });

    // console.log(user.type);
    // If loggedin user is a seller we cannot allow to access other seller catalog
    if (user.type === "seller") {
      res.status(400).send({
        message:
          "A seller cannot access other seller catalogs. please login with buyer account",
      });
    }

    // Check if Id is valid or not
    const seller = await User.findById({ _id: sellerID });

    if (!seller) {
      res.status(400).send("No seller found with this ID");
    } else if (seller.type == "buyer") {
      res.status(400).send({
        message: "A buyer don`t have any catalog",
      });
    }

    //  catalog of given seller
    const catalog = await Catalog.find({ seller: sellerID }).select(
      "-_id -__v -seller"
    );
    res.status(201).send(catalog);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred",
    });
  }
};
