const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { isAuthenticated, hasRole } = require('../middleware/auth');

// Add review - User only
router.post('/reviews', isAuthenticated, hasRole('user'), reviewController.addReview);

// Get reviews by product
router.get('/reviews/:productId', reviewController.getProductReviews);

module.exports = router;
