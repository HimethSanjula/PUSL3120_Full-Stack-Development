const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { cartService } = require('../services');

const addToCart = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;
  const user = req.user._id;
  const cart = await cartService.addItemToCart(user, productId, quantity);
  res.status(httpStatus.CREATED).send(cart);
});

const getCart = catchAsync(async (req, res) => {
  const user = req.user._id;
  const cart = await cartService.getCart(user);
  res.send(cart);
});

const removeItemFromCart = catchAsync(async (req, res) => {
  const productId  = req.params.id;
  const user = req.user._id;
  const cart = await cartService.deleteItemFromCart(user, productId);
  res.send(cart);
});

const updateQuantity = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;
  const user = req.user._id;
  const cart = await cartService.updateQuantity(user, productId, quantity);
  res.send(cart);
});



module.exports = {
  addToCart,
  getCart,
  removeItemFromCart,
  updateQuantity
};
