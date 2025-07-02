const { body } = require('express-validator');

exports.registerRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

exports.loginRules = [
  body('email').isEmail().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required')
];
