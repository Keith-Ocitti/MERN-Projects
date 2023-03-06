const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getSpecificProduct,
} = require("../controllers/products");

const orderItems = require("../controllers/order");

router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getSpecificProduct);
router.route("/order").post(orderItems);

module.exports = router;
