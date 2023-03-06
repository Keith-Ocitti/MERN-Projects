const { BadRequestError } = require("../errors/index");
const Product = require("../models/product");
const Order = require("../models/Order");
const { StatusCodes } = require("http-status-codes");

// get the array of objects from the cart
// compute the subtotal price of each item in the cart array
// compute the total cost of the order
// push the order to the database

const orderItems = async (req, res) => {
  const { cartItems, shippingFee, tax } = req.body;
  if (!cartItems || cartItems.length < 1) {
    return new BadRequestError("Cart is empty");
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbItem = await Product.findOne({ _id: item._id });
    if (!dbItem) {
      return new BadRequestError(`The is no item with id ${item._id}`);
    }
    const { name, price, image, _id } = dbItem;
    const singleOrderItem = {
      name,
      image,
      amount: item.quantity,
      price,
      product: _id,
    };
    orderItems = [...orderItems, singleOrderItem];
    subtotal += item.quantity * item.price;
  }
  const total = subtotal + tax + shippingFee;
  const newOrder = await Order.create({
    shippingFee,
    orderItems,
    user: req.user.userId,
    subtotal,
    total,
    tax,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ newOrder, nbHits: newOrder.orderItems.length });
};

module.exports = orderItems;
