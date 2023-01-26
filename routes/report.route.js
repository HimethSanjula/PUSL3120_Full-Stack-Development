const router = require('express').Router();
const { permissions } = require('../config/roles');
const authMiddleware = require('../middlewares/auth');

const { reportController } = require('../controllers');

router.get('/overview', authMiddleware(permissions.getOverview), reportController.getOverviewReport);
router.get('/sales', authMiddleware(permissions.getOverview), reportController.getMonthlySalesForYear);
router.get('/most-sold', authMiddleware(permissions.getOverview), reportController.getMostSoldProducts);
module.exports = router;