const router = require('express').Router();
const authRoutes = require('./auth.route');
const categoryRoutes = require('./category.route');
const productRoutes = require('./product.route');
const cartRoutes = require('./cart.route');
const orderRoutes = require('./order.route');
const reportRoutes = require('./report.route');

const defualtRoutes = [
  {
    path: '/auth',
    routes: authRoutes,
  },
  {
    path: '/categories',
    routes: categoryRoutes,
  },
  {
    path: '/products',
    routes: productRoutes,
  },
  {
    path: '/cart',
    routes: cartRoutes,
  },{
    path: '/order',
    routes: orderRoutes,
  },{
    path: '/report',
    routes: reportRoutes,
  }
];

defualtRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

module.exports = router;
