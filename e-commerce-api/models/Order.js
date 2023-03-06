const mongoose = require("mongoose");

const singleOrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  shippingFee: {
    type: Number,
    required: true,
  },
  orderItems: [singleOrderSchema],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
