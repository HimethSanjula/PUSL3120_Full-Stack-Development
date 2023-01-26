const permissions = {
  createCategory: 'createCategory',
  updateCategory: 'updateCategory',
  deleteCategory: 'deleteCategory',
  createProduct: 'createProduct',
  updateProduct: 'updateProduct',
  deleteProduct: 'deleteProduct',
  addReview: 'addReview',
  addToCart: 'addToCart',
  getCart: 'getCart',
  removeFromCart: 'removeFromCart',
  updateQuantity: 'updateQuantity',
  getProductsAdmin : 'getProductsAdmin',
  createOrder : 'createOrder',
  getOrders : 'getOrders',
  getAdminOrders : 'getAdminOrders',
  getOrder : 'getOrder',
  updateOrderStatus : 'updateOrderStatus',
  payOrder : 'payOrder',
  makeOrderDelivered : 'makeOrderDelivered',
  getOverview : 'getOverview',
};

const allRoles = {
  user: [
    permissions.addReview,
    permissions.addToCart,
    permissions.getCart,
    permissions.removeFromCart,
    permissions.updateQuantity,
    permissions.createOrder,
    permissions.getOrders,
    permissions.getOrder,
    permissions.payOrder,
  ],
  admin: [
    permissions.createCategory,
    permissions.updateCategory,
    permissions.deleteCategory,
    permissions.createProduct,
    permissions.updateProduct,
    permissions.deleteProduct,
    permissions.addReview,
    permissions.getProductsAdmin,
    permissions.getAdminOrders,
    permissions.getOrder,
    permissions.updateOrderStatus,
    permissions.makeOrderDelivered,
    permissions.payOrder,
    permissions.getOverview,

  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
  permissions,
};
