const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getSpecificProduct,
} = require("../controllers/products");

router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getSpecificProduct);

module.exports = router;
