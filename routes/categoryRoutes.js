const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.post(
  '/',
  [body('name').notEmpty().withMessage('Name is required')],
  CategoryController.createCategory
);

router.get('/', CategoryController.getAllCategories);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
