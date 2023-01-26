const httpStatus = require('http-status');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const { Product, Category, Review } = require('../models');

const createProduct = async (product) => {
  try {
    const category = await Category.findById(product.category);
    if (!category) {
      logger.error(`Category with id ${product.category} not found`);
      throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    return await new Product(product).save();
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getProduct = async (id) => {
  return await Product.findById(id).populate('category');
};

const getProducts = async () => {
  return await Product.find({ isDeleted: false }).populate('category');
};

const getProductsAdmin = async () => {
  return await Product.find().populate('category');
};

const getProductsByCategory = async (categoryId) => {
  return await Product.find({
    category: categoryId,
    isDeleted: false,
  });
};

const updateProduct = async (id, product) => {
  await isProductExists(id);
  return await Product.findByIdAndUpdate(id, product, { new: true });
};

const deleteProduct = async (id) => {
  await isProductExists(id);
  return await Product.findById(id).updateOne({ isDeleted: true });
};

const isProductExists = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    logger.error(`Product with id ${id} not found`);
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
};

const addReview = async (id, review) => {
  await isProductExists(id);
  const newReview = new Review(review);
  return newReview.save();
};

//get all reviews for a product
const getReviews = async (id) => {
  await isProductExists(id);
  return await Review.find({ product: id }).populate('user');
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  addReview,
  getReviews,
  getProductsAdmin
};
