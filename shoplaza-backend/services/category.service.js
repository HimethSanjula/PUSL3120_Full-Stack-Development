const httpStatus = require('http-status');
const { getProductsByCategory } = require('./product.service');
const logger = require('../config/logger');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');


const createCategory = async (category) => {
  try {
    return await new Category(category).save();
  } catch (error) {
    if (error.code === 11000) {
      logger.error(`Category with name ${category.name} already exists`);
      throw new ApiError(httpStatus.BAD_REQUEST, 'Category already exists');
    }
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
}

const getCategory = async (id) => {
  return await Category.findById(id);
}

const getCategories = async () => {
  return await Category.find();
}

const updateCategory = async (id, category) => {
  await isCategoryExists(id);
  return await Category.findByIdAndUpdate(id, category, { new: true });
}

const deleteCategory = async (id) => {
  await isCategoryExists(id);
  // check if category is used by any product
  const products = await getProductsByCategory(id);
  if (products.length > 0) {
    logger.error(`Category with id ${id} is used by some products`);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category is used by some products');
  }
  return await Category.findByIdAndDelete(id);
}

const isCategoryExists = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    logger.error(`Category with id ${id} not found`);
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
}

module.exports = {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory
};
