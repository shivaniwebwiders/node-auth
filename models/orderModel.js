const db = require('../config/db');

exports.createOrder = (order, cb) => {
  const sql = 'INSERT INTO orders (orderId, userId, shippingAddress) VALUES (?, ?, ?)';
  db.query(sql, [order.orderId, order.userId, order.shippingAddress], cb);
};

exports.findOrderByOrderId = (orderId, cb) => {
  const sql = 'SELECT * FROM orders WHERE orderId = ?';
  db.query(sql, [orderId], cb);
};

exports.findOrdersByUserId = (userId, cb) => {
  const sql = 'SELECT * FROM orders WHERE userId = ?';
  db.query(sql, [userId], cb);
};

exports.getAllOrders = (cb) => {
  const sql = 'SELECT * FROM orders';
  db.query(sql, cb);
};
