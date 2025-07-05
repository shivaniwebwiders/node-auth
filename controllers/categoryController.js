const { validationResult } = require('express-validator');
const Category = require('../models/categoryModel');

exports.createCategory = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, description } = req.body;

  Category.findCategoryByName(name, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length > 0) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    Category.createCategory({ name, description }, (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });

      const newCategory = {
        _id: result.insertId, // this is from MySQL insert result
        name,
        description
      };

      return res.status(201).json({
        message: 'Category created successfully',
        category: newCategory
      });
    });
  });
};
exports.getAllCategories = (req, res) => {
  Category.getAllCategories((err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    const formatted = results.map(cat => ({
      _id: cat.id,
      name: cat.name,
      description: cat.description
    }));

    res.status(200).json(formatted);
  });
};
exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  Category.findCategoryById(id, (err, results) => {
    if (err) {
      console.error('Find Error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    Category.updateCategory(id, { name, description }, (updateErr) => {
      if (updateErr) {
        console.error('Update Error:', updateErr);
        return res.status(500).json({ message: 'Update failed' });
      }

      res.status(200).json({ message: 'Category updated successfully' });
    });
  });
};

exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  Category.deleteCategory(id, (err, result) => {
    if (err) {
      console.error('Delete Error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  });
};
