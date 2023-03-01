const { BadRequestError } = require("../errors/index");
const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  const product = await Product.find({});
  res.status(StatusCodes.OK).json({ product });
};

const getSpecificProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    throw new BadRequestError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json(product);
};

const createProduct = async (req, res) => {
  res.send(`create a product`);
};

const deleteProduct = async (req, res) => {
  res.send(`delete a product`);
};

const updateProduct = async (req, res) => {
  res.send(`update a product`);
};

module.exports = {
  getAllProducts,
  getSpecificProduct,
};
