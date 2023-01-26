const joi = require('joi');

const createOrder = {
  body: joi.object().keys({
    name : joi.string().required(),
    products: joi.array().items(joi.object().keys({
      product: joi.string().hex().length(24).required(),
      quantity: joi.number().required(),
      price: joi.number().required(),
    })).required(),
    totalPrice: joi.number().required(),
    paymentMethod: joi.string().required(),
    isPaid: joi.boolean().default(false),
    paidAt: joi.date(),
    isDelivered: joi.boolean().default(false),
    deliveredAt: joi.date(),
    orderStatus: joi.string().default('Processing'),
    deliveryAddress: joi.string(),
    state: joi.string().required(),
    city: joi.string().required(),
    zip: joi.string().required(),
  }),
};

const updateStatus = {
  body: joi.object().keys({
    status: joi.string()
  }),
};


const createTransaction = {
  body: joi.object().keys({
    order: joi.string().hex().length(24).required(),
    amount: joi.number().required(),
    card: joi.string().length(4).required(),
    paymentMethod: joi.string().required()
  })
};

module.exports = {
  createOrder,
  updateStatus,
  createTransaction
};

