const { validationResult } = require('express-validator');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

exports.createProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, description, price, stock, sku, imageUrl, categoryId } = req.body;

  // Step 1: Validate categoryId exists
  Category.findCategoryById(categoryId, (catErr, catResult) => {
    if (catErr) {
      return res.status(500).json({ message: 'Database error', error: catErr });
    }

    if (catResult.length === 0) {
      return res.status(400).json({ message: 'Invalid category ID. Category does not exist.' });
    }

    // Step 2: Insert product
    Product.createProduct(
      { name, description, price, stock, sku, imageUrl, categoryId },
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
        }

        const newProduct = {
          _id: result.insertId,
          name,
          description,
          price,
          stock,
          sku,
          imageUrl,
          categoryId,
        };

        return res.status(201).json({
          message: 'Product created successfully',
          product: newProduct,
        });
      }
    );
  });
};

exports.getAllProducts = (req, res) => {
  Product.getAllProducts((err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    const formatted = results.map(prod => ({
      _id: prod.id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      stock: prod.stock,
      sku: prod.sku,
      imageUrl: prod.imageUrl,
      categoryId: prod.categoryId,
      categoryName: prod.categoryName || null
    }));

    res.status(200).json(formatted);
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, sku, imageUrl, categoryId } = req.body;

  Product.findProductById(id, (err, results) => {
    if (err) {
      console.error('Find Error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Product.updateProduct(id, { name, description, price, stock, sku, imageUrl, categoryId }, (updateErr) => {
      if (updateErr) {
        console.error('Update Error:', updateErr);
        return res.status(500).json({ message: 'Update failed' });
      }

      res.status(200).json({ message: 'Product updated successfully' });
    });
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  Product.deleteProduct(id, (err, result) => {
    if (err) {
      console.error('Delete Error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  });
};
