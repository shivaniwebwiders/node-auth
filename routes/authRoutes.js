const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const hasRole = require('../middleware/hasRole');
const { registerRules, loginRules } = require('../validators/authValidator');

const validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

router.post('/register', validate(registerRules), authController.register);
router.post('/login', validate(loginRules), authController.login);

// 👇 Example: only authenticated users with role `admin` or `user` can access
router.get('/dashboard', authMiddleware, hasRole('admin', 'user', 'seller'), authController.dashboard);

router.post('/logout', authController.logout);

module.exports = router;
