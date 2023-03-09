const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    image: {
      type: String,
      required: [true, "Please provide product image"],
    },
    quantity: {
      type: Number,
    },
    rating: {
      type: Number,
      requuired: [true, "Please provide product rating"],
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
