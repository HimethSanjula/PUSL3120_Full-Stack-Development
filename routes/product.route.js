const router = require('express').Router();
const { permissions } = require('../config/roles');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const { productController } = require('../controllers');
const { productValidation } = require('../validations');

router.post(
  '/',
  authMiddleware(permissions.createProduct),
  validate(productValidation.createProduct),
  productController.createProduct
);
router.get('/', productController.getProducts);
router.get('/admin',authMiddleware(permissions.getProductsAdmin), productController.getProductsAdmin);
router.get('/:productId', productController.getProduct);
router.get('/category/:categoryId', productController.getProductsByCategory);
router.put(
  '/:productId',
  authMiddleware(permissions.updateProduct),
  validate(productValidation.updateProduct),
  productController.updateProduct
);
router.delete('/:productId', authMiddleware(permissions.deleteProduct), productController.deleteProduct);
router.post('/review/:productId', authMiddleware(permissions.addReview),validate(productValidation.reviewProduct), productController.addReview);
router.get('/review/:productId', productController.getReviews);

module.exports = router;
