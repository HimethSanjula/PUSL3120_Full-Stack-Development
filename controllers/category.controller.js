const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');
const ApiError = require('../utils/ApiError');

const createCategory = catchAsync(async (req, res) => {
  const categoryBody = req.body;
  categoryBody.createdBy = req.user._id;
  const category = await categoryService.createCategory(categoryBody);
  res.status(httpStatus.CREATED).send(category);
});

const getCategories = catchAsync(async (req, res) => {
  const result = await categoryService.getCategories();
  res.send(result);
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategory(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.categoryId, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.categoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};