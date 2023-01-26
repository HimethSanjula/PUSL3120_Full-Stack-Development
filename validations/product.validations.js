const joi = require('joi');

const createProduct = {
  body: joi.object().keys({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    category: joi.string().hex().length(24),
    image: joi.string().required(),
    quantity: joi.number().required(),
  }),
};

const updateProduct = {
  body: joi.object().keys({
    name: joi.string(),
    description: joi.string(),
    price: joi.number(),
    category: joi.string().hex().length(24),
    image: joi.string(),
    quantity: joi.number(),
  }),
};

const reviewProduct = {
  body: joi.object().keys({
    rating: joi.number().required(),
    comment: joi.string(),
  }),
}

module.exports = {
  createProduct,
  updateProduct,
  reviewProduct,
};