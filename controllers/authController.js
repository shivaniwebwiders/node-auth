const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  userModel.createUser({ name, email, password: hashed }, (err) => {
    if (err) return res.status(500).json({ message: 'User creation failed', error: err });
    res.status(201).json({ message: 'User registered' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  userModel.findUserByEmail(email, async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
};

exports.dashboard = (req, res) => {
  res.json({ message: `Welcome User ID ${req.user.id}` });
};

exports.logout = (req, res) => {
  // JWT logout is handled on client side by removing token
  res.json({ message: 'Logged out. Remove token on client side.' });
};
