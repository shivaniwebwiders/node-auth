const productModel = require('../models/productModel');

exports.createProduct = (req, res) => {
  productModel.createProduct(req.body, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    
    res.status(201).json({
      message: 'Product created successfully',
      product: { id: result.insertId, ...req.body }
    });
  });
};
