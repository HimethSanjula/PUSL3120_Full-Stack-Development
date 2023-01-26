const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  products: [
    {
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

/**
 * @typedef Cart
 * @property {ObjectId} user.required - User id
 * @property {Array.<Object>} products - Products in the cart
 * @property {ObjectId} products.product.required - Product id
 * @property {number} products.quantity.required - Quantity of the product
 */
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;