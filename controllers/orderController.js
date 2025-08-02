const Order = require('../models/orderModel');
const db = require('../config/db');

// POST /orders
exports.placeOrder = (req, res) => {
  const { orderId, shippingAddress } = req.body;
  const userId = req.user.id;

  const order = { orderId, userId, shippingAddress };
  Order.createOrder(order, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    return res.status(201).json({ message: 'Order placed successfully', order });
  });
};

// GET /orders/:orderId
exports.getOrderByOrderId = (req, res) => {
  const orderId = req.params.orderId;
  Order.findOrderByOrderId(orderId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching order', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Order not found' });
    return res.json(results[0]);
  });
};

// GET /orders/user/:userId (Admin/Seller use)
exports.getOrdersByUserId = (req, res) => {
  const userId = req.params.userId;
  Order.findOrdersByUserId(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching orders', error: err });
    return res.json(results);
  });
};

// ✅ GET /orders/user (Get orders for logged-in user)
exports.getUserOrders = (req, res) => {
  const userId = req.user.id;

  Order.findOrdersByUserId(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching user orders', error: err });

    const simplified = results.map(order => ({
      _id: order.orderId,
      status: order.status || 'pending'
    }));

    return res.json(simplified);
  });
};

// ✅ GET /orders (Admin/Seller get all orders)
exports.getAllOrders = (req, res) => {
  const sql = `
    SELECT o.orderId AS _id, o.userId AS user, o.shippingAddress, o.status
    FROM orders o
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching all orders', error: err });

    return res.json(results);
  });
};

// ✅ POST /orders/apply-coupon
exports.applyCoupon = (req, res) => {
  const { couponCode, totalAmount } = req.body;

  const sql = 'SELECT * FROM coupons WHERE code = ? AND isActive = 1 LIMIT 1';
  db.query(sql, [couponCode], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Invalid or expired coupon' });
    }

    const coupon = results[0];

    // Check expiry date
    if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    const discount = (coupon.discountPercentage / 100) * totalAmount;
    const newTotal = parseFloat((totalAmount - discount).toFixed(2));

    return res.json({
      discountApplied: true,
      newTotal
    });
  });
};
