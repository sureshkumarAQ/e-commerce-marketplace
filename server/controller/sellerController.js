const Catalog = require("../models/catalog.js");
const User = require("../models/user.js");

exports.createCatalog = async (req, res) => {
  try {
    if (!req.body.products) {
      res
        .status(400)
        .send({ message: "Please add at least one product in the catalog" });
    }

    const userID = req.user._id;

    const productName = req.body.products.productName;
    const price = req.body.products.price;

    // productName is an array of all products name and price is a corresponding price array of productName. both are part of catalog

    // products is a object which contain productName and price array in catalog
    const products = { productName, price };
    // console.log(products);

    const catalog = await new Catalog({
      products: products,
      seller: userID,
    });

    //Save this catalog in the database
    await catalog
      .save(catalog)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Catalog is not created",
        });
      });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating a new catalog",
    });
  }
};
