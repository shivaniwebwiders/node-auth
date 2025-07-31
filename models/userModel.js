const db = require('../config/db');

exports.createUser = (user, cb) => {
  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  const role = user.role || 'user'; // default to 'user' if not provided
  db.query(sql, [user.name, user.email, user.password, role], cb);
};

exports.findUserByEmail = (email, cb) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], cb);
};
