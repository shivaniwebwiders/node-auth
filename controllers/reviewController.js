const Review = require('../models/reviewModel');

// POST /reviews - Add Review (User only)
exports.addReview = (req, res) => {
  const userId = req.user.id;
  const { productId, rating, comment } = req.body;

  const review = { userId, productId, rating, comment };

  Review.createReview(review, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error saving review', error: err });
    return res.status(201).json({ message: 'Review submitted successfully' });
  });
};

// GET /reviews/:productId - Get Product Reviews
exports.getProductReviews = (req, res) => {
  const productId = req.params.productId;

  Review.getReviewsByProduct(productId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching reviews', error: err });
    return res.json(results);
  });
};
