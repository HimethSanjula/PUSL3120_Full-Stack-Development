const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  const orderBody = req.body;
  orderBody.user = req.user._id;
  const order = await orderService.createOrder(orderBody);
  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
  const user = req.user._id;
  const result = await orderService.getOrders(user);
  res.send(result);
});

const getOrdersAdmin = catchAsync(async (req, res) => {
  const result = await orderService.getOrdersAdmin();
  res.send(result);
});

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrder(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const updateStatus = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderStatus(req.params.orderId, req.body.status);
  res.send(order);
});

const deliverOrder = catchAsync(async (req, res) => {
  const order = await orderService.makeOrderDelivered(req.params.orderId);
  res.send(order);
});

const makeTransaction = catchAsync(async (req, res) => {
  const user = req.user._id;
  const transaction = await orderService.makeTransaction(user, req.body);
  res.send(transaction);
});

const getTransactions = catchAsync(async (req, res) => {
  const transactions = await orderService.getTransactions(req.user._id);
  res.send(transactions);
});

module.exports = {
  createOrder,
  getOrders,
  getOrdersAdmin,
  getOrder,
  updateStatus,
  deliverOrder,
  makeTransaction,
  getTransactions,
};
