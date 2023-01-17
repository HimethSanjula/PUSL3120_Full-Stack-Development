const joi = require('joi');

const addToCart = {
  body: joi.object().keys({
    productId: joi.string().hex().length(24).required(),
    quantity: joi.number().required(),
  }),
};

const updateQuantity = {
  body: joi.object().keys({
    productId: joi.string().hex().length(24).required(),
    quantity: joi.number().required(),
  }),
};

module.exports = {
  addToCart,
  updateQuantity,
};
