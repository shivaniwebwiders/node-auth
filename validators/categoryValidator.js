const { body } = require('express-validator');

exports.createCategoryRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional().isString().withMessage('Description must be a string')
];
