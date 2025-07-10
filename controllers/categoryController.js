const { validationResult } = require('express-validator');
const CategoryService = require('../services/categoryService');

exports.createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { name, description } = req.body;
    const result = await CategoryService.createCategory({ name, description });

    if (result.exists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    res.status(201).json({
      message: 'Category created successfully',
      category: {
        id: result.id,
        name,
        description
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updated = await CategoryService.updateCategory(id, { name, description });

    if (!updated) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await CategoryService.deleteCategory(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};