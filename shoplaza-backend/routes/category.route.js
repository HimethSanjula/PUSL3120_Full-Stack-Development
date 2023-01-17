const router = require('express').Router();
const { permissions } = require('../config/roles');
const { categoryController } = require('../controllers');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware(permissions.createCategory), categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:categoryId', categoryController.getCategory);
router.put('/:categoryId', authMiddleware(permissions.updateCategory), categoryController.updateCategory);
router.delete('/:categoryId', authMiddleware(permissions.deleteCategory), categoryController.deleteCategory);

module.exports = router;
