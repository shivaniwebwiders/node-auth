const db = require('../config/db'); // mysql2 connection

// Create product
exports.createProduct = (data, cb) => {
  const sql = `
    INSERT INTO products (name, description, price, stock, sku, imageUrl, categoryId)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.name,
    data.description,
    data.price,
    data.stock,
    data.sku,
    data.imageUrl,
    data.categoryId
  ];
  db.query(sql, values, cb);
};

// Get all products
exports.getAllProducts = (cb) => {
  const sql = `
    SELECT p.*, c.name as categoryName 
    FROM products p
    LEFT JOIN categories c ON p.categoryId = c.id
  `;
  db.query(sql, cb);
};

// Get product by ID
exports.findProductById = (id, cb) => {
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.query(sql, [id], cb);
};

// Update product
exports.updateProduct = (id, data, cb) => {
  const sql = `
    UPDATE products 
    SET name = ?, description = ?, price = ?, stock = ?, sku = ?, imageUrl = ?, categoryId = ? 
    WHERE id = ?
  `;
  const values = [
    data.name,
    data.description,
    data.price,
    data.stock,
    data.sku,
    data.imageUrl,
    data.categoryId,
    id
  ];
  db.query(sql, values, cb);
};

// Delete product
exports.deleteProduct = (id, cb) => {
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], cb);
};

// Find product by SKU
exports.findProductBySku = (sku, cb) => {
  const sql = 'SELECT * FROM products WHERE sku = ?';
  db.query(sql, [sku], cb);
};
