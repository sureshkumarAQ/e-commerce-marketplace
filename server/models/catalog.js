const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  products: {
    productName: [
      {
        type: String,
        required: true,
      },
    ],
    price: [
      {
        type: Number,
        required: true,
      },
    ],
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Catalog = mongoose.model("catalog", schema);

module.exports = Catalog;
