const httpStatus = require('http-status');
const logger = require('../config/logger');
const { Product, Order, User, Transaction } = require('../models');
const ApiError = require('../utils/ApiError');

const getOverviewReport = async () => {
  const productsC = await Product.find({ isDeleted: false });
  const products = productsC.length;
  const orders = await Order.countDocuments();
  const users = await User.countDocuments();
  const payments = await Transaction.countDocuments();

  return {
    products,
    orders,
    users,
    payments,
  };
};

const getMonthlySalesForYear = async () => {
  const year = new Date().getFullYear() - 1;
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  const start = new Date();
  start.setMonth(start.getMonth() - 12);
  const end = new Date();

  const sales = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: start,
          $lt: end,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m',
            date: '$createdAt',
          },
        },
        total: {
          $sum: {
            $cond: [{ $eq: [{ $sum: "$totalPrice" }, 0] }, 0, { $sum: "$totalPrice" }]
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ])
  return sales;
};

const getMostSoldProducts = async () => {
  const products = await Order.aggregate([
    {
      $unwind: '$products',
    },
    {
      $group: {
        _id: '$products.product',
        total: {
          $sum: '$products.quantity',
        },
      },
    },
    {
      $sort: { total: -1 },
    },
    {
      $limit: 4,
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },
    {
      $project: {
        _id: 0,
        name: '$product.name',
        id: '$product._id',
        image: '$product.image',
        total: 1,
      },
    },
  ]);
  return products;
};


module.exports = {
  getOverviewReport,
  getMonthlySalesForYear,
  getMostSoldProducts,
};
