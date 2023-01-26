const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Order',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      type: Boolean
    },
    card : {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Transaction
 * @property {string} user
 * @property {string} order
 * @property {number} amount
 * @property {string} paymentMethod
 * @property {boolean} paymentResult
 * @property {string} card
 **/
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;