const Review_Function = require('./Review_Function');

test(' When user review his order product system will display reviw average.  In this unit test product_points  is 35 , review count  is 10. Therefore, review average is 3.5', () => {
  expect(Review_Function(35, 10)).toBe(3.5);
});