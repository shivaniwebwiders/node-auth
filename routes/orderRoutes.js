const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { placeOrderRules, validateOrder } = require('../validators/orderValidator');
const isAuthenticated = require('../middleware/isAuthenticated');
const hasRole = require('../middleware/hasRole');

// POST - Place Order
router.post(
  '/orders',
  isAuthenticated,
  hasRole('user'),
  placeOrderRules,
  validateOrder,
  orderController.placeOrder
);

// GET - All orders by userId
router.get(
  '/orders/user/:userId',
  isAuthenticated,
  hasRole('user'),
  orderController.getOrdersByUserId
);

// GET - Order by orderId
router.get(
  '/orders/:orderId',
  isAuthenticated,
  hasRole('user'),
  orderController.getOrderByOrderId
);

// Get current user’s orders
router.get(
  '/orders/user',
  isAuthenticated,
  hasRole('user'),
  orderController.getUserOrders
);

// Get all orders (admin/seller)
router.get(
  '/orders',
  isAuthenticated,
  hasRole('admin', 'seller'),
  orderController.getAllOrders
);
router.post('/orders/apply-coupon', orderController.applyCoupon);

module.exports = router;
