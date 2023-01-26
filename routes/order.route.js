const router = require('express').Router();
const { permissions } = require('../config/roles');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const {orderController} = require('../controllers');
const {orderValidation} = require('../validations');

router.post('/', authMiddleware(permissions.createOrder), validate(orderValidation.createOrder), orderController.createOrder);
router.get('/', authMiddleware(permissions.getOrders), orderController.getOrders);
router.get('/admin', authMiddleware(permissions.getAdminOrders), orderController.getOrdersAdmin);
router.get('/transactions', authMiddleware(permissions.payOrder),  orderController.getTransactions);
router.get('/:orderId', authMiddleware(permissions.getOrder), orderController.getOrder);

router.put('/status/:orderId', authMiddleware(permissions.updateOrderStatus), orderController.updateStatus);
router.post('/payment',authMiddleware(permissions.payOrder),validate(orderValidation.createTransaction), orderController.makeTransaction);
router.put('/delivery/:orderId', authMiddleware(permissions.makeOrderDelivered), orderController.deliverOrder);

module.exports = router;