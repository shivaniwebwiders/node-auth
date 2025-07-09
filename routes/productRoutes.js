const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // ✅ Controller
const { createProductRules } = require('../validators/productValidator'); // ✅ Validator

// POST - Create product
router.post('/products', createProductRules, productController.createProduct);

// GET - All products
router.get('/products-all', productController.getAllProducts);

// PUT - Update product
router.put('/products/:id', productController.updateProduct);

// DELETE - Delete product
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
