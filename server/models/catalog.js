const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
});

var schema = new mongoose.Schema({
  products: [productSchema],
  seller: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Catalog = mongoose.model("catalog", schema);

module.exports = Catalog;
