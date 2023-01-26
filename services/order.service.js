const httpStatus = require('http-status');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const { Order, Product, Transaction, Cart } = require('../models');

const createOrder = async (order) => {
  // order - { user, products: [{ product, quantity, price }] }
  // check if products exists
  const products = await Product.find({ _id: { $in: order.products.map((p) => p.product) } });
  if (products.length !== order.products.length) {
    logger.error('Some products not found');
    throw new ApiError(httpStatus.BAD_REQUEST, 'Some products not found');
  }
  // check if products are available
  const productsNotAvailable = order.products.filter(
    (p) => products.find((pr) => pr._id == p.product).quantity < p.quantity
  );
  if (productsNotAvailable.length > 0) {
    logger.error('Some products are not available');
    throw new ApiError(httpStatus.BAD_REQUEST, 'Some products are not available');
  }
  // update product quantity
  order.products.forEach((p) => {
    const product = products.find((pr) => pr._id == p.product);
    product.quantity -= p.quantity;
  });
  await Product.bulkWrite(
    products.map((p) => ({ updateOne: { filter: { _id: p._id }, update: { quantity: p.quantity } } }))
  );
  // create order
  const newOrder = new Order(order);
  // clear user cart
  await Cart.deleteMany({ user: order.user });
  return await newOrder.save();
};

const getOrders = async (userId) => {
  try {
    const orders = await Order.find({ user: userId }).populate('products.product').populate('transaction');
    if (!orders) {
      logger.error(`No orders found for user ${userId}`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Orders not found');
    }
    return orders;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getOrdersAdmin = async () => {
  try {
    // populate products and user
    const orders = await Order.find().populate('user').populate('products.product');
    if (!orders) {
      logger.error(`No orders found`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Orders not found');
    }
    return orders;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

// update order status
const updateOrderStatus = async (orderId, status) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      logger.error(`Order with id ${orderId} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
    order.orderStatus = status;
    if(status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    return await order.save();
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

// make order delivered
const makeOrderDelivered = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      logger.error(`Order with id ${orderId} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
    order.orderStatus = 'Delivered';
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    return await order.save();
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate('products.product').populate('transaction').populate('user');
    if (!order) {
      logger.error(`Order with id ${orderId} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
    return order;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const makeTransaction = async (userId, transaction) => {
  try {
    const order = await Order.findById(transaction.order);
    if (!order) {
      logger.error(`Order with id ${transaction.orderId} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
    order.orderStatus = 'Paid, Processing';
    order.isPaid = true;
    order.paidAt = Date.now();

    transaction.paymentResult = true;
    transaction.user = userId;
    const newTransaction = new Transaction(transaction);
    await newTransaction.save();
    order.transaction = newTransaction._id;
    await order.save();
    return newTransaction;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getTransactions = async (userId) => {
  try {
    const transactions = await Transaction.find({ user: userId });
    if (!transactions) {
      logger.error(`No transactions found for user ${userId}`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Transactions not found');
    }
    return transactions;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrdersAdmin,
  updateOrderStatus,
  makeOrderDelivered,
  getOrder,
  makeTransaction,
  getTransactions,
};
