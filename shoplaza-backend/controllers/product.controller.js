const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const productBody = req.body;
  productBody.createdBy = req.user._id;
  const product = await productService.createProduct(productBody);
  res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const result = await productService.getProducts();
  res.send(result);
});

const getProductsAdmin = catchAsync(async (req, res) => {
  const result = await productService.getProductsAdmin();
  res.send(result);
});


const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProduct(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const getProductsByCategory = catchAsync(async (req, res) => {
  const result = await productService.getProductsByCategory(req.params.categoryId);
  res.send(result);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProduct(req.params.productId, req.body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProduct(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

const addReview = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const reviewData = req.body;
  reviewData.user = req.user._id;
  reviewData.product = productId;
  const review = await productService.addReview(productId, reviewData);
  res.send(review);
});

// get all reviews of a product
const getReviews = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const reviews = await productService.getReviews(productId);
  res.send(reviews);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  addReview,
  getReviews,
  getProductsAdmin
};

