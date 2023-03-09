const { BadRequestError } = require("../errors/index");
const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

// function to get all products
const getAllProducts = async (req, res) => {
  const product = await Product.find({});
  res.status(StatusCodes.OK).json({ product });
};

// function to get a single product
const getSpecificProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    throw new BadRequestError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json(product);
};

module.exports = {
  getAllProducts,
  getSpecificProduct,
};
