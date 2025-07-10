const db = require('../config/db'); // mysql2/promise connection

exports.findBySKU = async (sku) => {
  const [rows] = await db.query('SELECT * FROM products WHERE sku = ?', [sku]);
  return rows;
};

exports.create = async (data) => {
  const { name, description, price, stock, sku, imageUrl, categoryId } = data;
  const [result] = await db.query(
    `INSERT INTO products (name, description, price, stock, sku, imageUrl, categoryId)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, description, price, stock, sku, imageUrl, categoryId]
  );
  return result;
};

exports.findAll = async () => {
  const [rows] = await db.query('SELECT * FROM products');
  return rows;
};

exports.update = async (id, data) => {
  const { name, description, price, stock, sku, imageUrl, categoryId } = data;
  const [result] = await db.query(
    `UPDATE products SET name=?, description=?, price=?, stock=?, sku=?, imageUrl=?, categoryId=?
     WHERE id=?`,
    [name, description, price, stock, sku, imageUrl, categoryId, id]
  );
  return result;
};

exports.delete = async (id) => {
  const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
  return result;
};
