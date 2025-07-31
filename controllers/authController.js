const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if email already exists
    userModel.findUserByEmail(email, async (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error', error: err });

      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // 2. Hash password and create user
      const hashed = await bcrypt.hash(password, 10);
      userModel.createUser({ name, email, password: hashed, role: role || 'user' }, (err) => {
        if (err) return res.status(500).json({ message: 'User creation failed', error: err });
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Unexpected error', error: err.message });
  }
};


exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Include role in JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
};

exports.dashboard = (req, res) => {
  res.json({ message: `Welcome User ID ${req.user.id} with role ${req.user.role}` });
};

exports.logout = (req, res) => {
  res.json({ message: 'Logged out. Remove token on client side.' });
};
