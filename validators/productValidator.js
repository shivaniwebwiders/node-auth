const { body } = require('express-validator');

exports.createProductRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('sku').notEmpty().withMessage('SKU is required'),
  body('imageUrl').isURL().withMessage('Image URL must be valid'),
  body('categoryId').notEmpty().withMessage('Category ID is required')
];
