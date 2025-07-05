const db = require('../config/db'); // this should be your mysql2 connection

exports.createCategory = (data, cb) => {
  const sql = 'INSERT INTO categories (name, description) VALUES (?, ?)';
  db.query(sql, [data.name, data.description], cb);
};

exports.findCategoryByName = (name, cb) => {
  const sql = 'SELECT * FROM categories WHERE name = ?';
  db.query(sql, [name], cb);
};

exports.getAllCategories = (cb) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, cb);
};


exports.updateCategory = (id, data, cb) => {
  const sql = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
  db.query(sql, [data.name, data.description, id], cb);
};

exports.findCategoryById = (id, cb) => {
  const sql = 'SELECT * FROM categories WHERE id = ?';
  db.query(sql, [id], cb);
};


exports.deleteCategory = (id, cb) => {
  const sql = 'DELETE FROM categories WHERE id = ?';
  db.query(sql, [id], cb);
};
