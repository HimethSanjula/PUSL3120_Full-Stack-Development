const Product_Function = require('./Product_Function');

test(' When use purchase products from store. System will display available product count.  In this unit test Product count is 20, Sell count is 10. Therefore, available count is 10', () => {
  expect(Product_Function(20, 10)).toBe(10);
});