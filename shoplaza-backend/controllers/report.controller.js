const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { reportService } = require('../services');

const getOverviewReport = catchAsync(async (req, res) => {
  const result = await reportService.getOverviewReport();
  res.send(result);
});

const getMonthlySalesForYear = catchAsync(async(req, res) => {
  const result = await reportService.getMonthlySalesForYear();
  res.send(result);
})

const getMostSoldProducts = catchAsync(async(req, res) => {
  const result = await reportService.getMostSoldProducts();
  res.send(result);
})

module.exports = {
  getOverviewReport,
  getMonthlySalesForYear,
  getMostSoldProducts,
};