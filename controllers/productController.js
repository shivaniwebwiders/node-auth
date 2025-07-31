const { validationResult } = require('express-validator');
const ProductService = require('../services/productService');

exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const data = req.body;

  try {
    const result = await ProductService.createProduct(data);

    if (result.exists) {
      return res.status(400).json({ message: 'Product SKU already exists' });
    }

    return res.status(201).json({
      message: 'Product created successfully',
      product: { _id: result.id, ...data }
    });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await ProductService.updateProduct(id, data);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Update error', error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ProductService.deleteProduct(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete error', error: err });
  }
};
