const { body, validationResult } = require('express-validator');

exports.placeOrderRules = [
  body('products')
    .isArray({ min: 1 }).withMessage('Products array is required and must have at least one item'),
  body('products.*.productId')
    .notEmpty().withMessage('Each product must have a productId'),
  body('products.*.quantity')
    .isInt({ min: 1 }).withMessage('Each product must have a quantity of at least 1'),
  body('shippingAddress')
    .notEmpty().withMessage('Shipping address is required')
];

exports.validateOrder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
