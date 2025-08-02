const { validationResult } = require('express-validator');
const ProductService = require('../services/productService');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

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


exports.placeOrder = async (req, res) => {
  const { items, shippingAddress } = req.body; // items = [{ productId, quantity }]
  const userId = req.user.id;

  try {
    let totalAmount = 0;
    const updatedProducts = [];

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${product.name}`
        });
      }

      // Calculate cost
      totalAmount += product.price * item.quantity;

      // Prepare stock update
      product.stock -= item.quantity;
      updatedProducts.push(product);

      // Low stock alert
      if (product.stock < 5) {
        console.warn(`⚠️ Stock low for product ${product.name}: Only ${product.stock} left`);
        // Optional: send email/notification to admin
      }
    }

    // Save updated stock
    await Promise.all(updatedProducts.map(p => p.save()));

    // Save order
    const newOrder = await Order.create({
      userId,
      items: JSON.stringify(items),
      shippingAddress,
      totalAmount
    });

    return res.status(201).json({
      message: 'Order placed successfully',
      orderId: newOrder.id,
      summary: {
        totalItems: items.length,
        totalAmount
      }
    });

  } catch (err) {
    return res.status(500).json({ message: 'Order failed', error: err.message });
  }
};