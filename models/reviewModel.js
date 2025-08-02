const db = require('../config/db');

exports.createReview = (review, callback) => {
  const { userId, productId, rating, comment } = review;
  const sql = `INSERT INTO reviews (userId, productId, rating, comment) VALUES (?, ?, ?, ?)`;
  db.query(sql, [userId, productId, rating, comment], callback);
};

exports.getReviewsByProduct = (productId, callback) => {
  const sql = `
    SELECT u.name AS user, r.rating, r.comment
    FROM reviews r
    JOIN users u ON r.userId = u.id
    WHERE r.productId = ?
  `;
  db.query(sql, [productId], callback);
};
