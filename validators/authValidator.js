const { body } = require('express-validator');


exports.registerRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required'),

  body('email')
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['admin', 'seller', 'user']).withMessage('Role must be admin, seller, or user')
];



exports.loginRules = [
  body('email').isEmail().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required')
];
