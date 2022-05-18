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
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Order = mongoose.model("order", schema);

module.exports = Order;
