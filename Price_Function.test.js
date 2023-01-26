const Price_Function = require('./Price_Function');

test(' When use purchase products from store. System will display total price.  In this unit test Quantity is 4 , unit price  is 1200. Therefore, total price count is 4800', () => {
  expect(Price_Function(4, 1200)).toBe(4800);
});