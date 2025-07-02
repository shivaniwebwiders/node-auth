const db = require('../config/db');

exports.createUser = (user, cb) => {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [user.name, user.email, user.password], cb);
};

exports.findUserByEmail = (email, cb) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], cb);
};
