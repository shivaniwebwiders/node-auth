const db = require('../config/db'); // use your DB connection pool

exports.findByName = async (name) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE name = ?', [name]);
  return rows;
};

exports.findAll = async () => {
  const [rows] = await db.query('SELECT * FROM categories');
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
  return rows;
};

exports.create = async ({ name, description }) => {
  const [result] = await db.query(
    'INSERT INTO categories (name, description) VALUES (?, ?)',
    [name, description]
  );
  return result;
};

exports.update = async (id, { name, description }) => {
  await db.query(
    'UPDATE categories SET name = ?, description = ? WHERE id = ?',
    [name, description, id]
  );
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
  return result;
};
