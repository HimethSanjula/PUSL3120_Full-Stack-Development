const router = require('express').Router();
const { permissions } = require('../config/roles');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { cartController } = require('../controllers');
const { cartValidation } = require('../validations');

router.post('/', authMiddleware(permissions.addToCart), validate(cartValidation.addToCart), cartController.addToCart);
router.get('/', authMiddleware(permissions.getCart), cartController.getCart);
router.delete('/remove/:id', authMiddleware(permissions.removeFromCart), cartController.removeItemFromCart);
router.put('/update', authMiddleware(permissions.updateQuantity), validate(cartValidation.updateQuantity), cartController.updateQuantity);

module.exports = router;