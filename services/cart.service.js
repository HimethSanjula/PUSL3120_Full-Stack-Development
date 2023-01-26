const httpStatus = require('http-status');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const { Cart, Product } = require('../models');
const e = require('express');

const addItemToCart = async (userId, productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (!product || product.isDeleted) {
      logger.error(`Product with id ${product} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    // check if user has a cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // create a new cart
      const newCart = new Cart({
        user: userId,
        products: [
          {
            product: productId,
            quantity: quantity,
          },
        ],
      });
      // populate product details
      await newCart.populate('products.product');
      return await newCart.save();
    } else {
      // check if product already exists in cart
      const itemIndex = cart.products.findIndex((p) => p.product == productId);
      if (itemIndex > -1) {
        if(product.quantity >= cart.products[itemIndex].quantity + 1) {
          cart.products[itemIndex].quantity += 1;
        }
      } else {
        cart.products.push({
          product: productId,
          quantity: quantity,
        });
      }

      await cart.populate('products.product');
      return await cart.save();
    }
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ user: userId }).populate('products.product');
    if (!cart) {
      logger.error(`Cart with id ${cart} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    return cart;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const deleteItemFromCart = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      logger.error(`Cart with id ${cart} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    // check if product exists in cart
    const itemIndex = cart.products.findIndex((p) => p.product == productId);
    if (itemIndex > -1) {
      // remove product from cart
      cart.products.splice(itemIndex, 1);
    }else{
      logger.error(`Product with id ${productId} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found in the cart');
    }
    return await cart.save();
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const updateQuantity = async (userId, productId, quantity) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      logger.error(`Cart with id ${cart} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    // check if product exists in cart
    const itemIndex = cart.products.findIndex((p) => p.product == productId);
    if (itemIndex > -1) {
      //find product
      const product = await Product.findById(productId);
      if (!product || product.isDeleted) {
        logger.error(`Product with id ${product} not found`);
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
      }
      // check if quantity is valid
      if (quantity > product.quantity) {
        logger.error(`Quantity is not valid`);
        throw new ApiError(httpStatus.BAD_REQUEST, 'Item quantity is less than what you have requested');
      }
      // increase quantity
      cart.products[itemIndex].quantity = quantity;
    } else {
      logger.error(`Product with id ${productId} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found in the cart');
    }
    return await cart.save();
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

module.exports = {
  addItemToCart,
  getCart,
  deleteItemFromCart,
  updateQuantity,
};
