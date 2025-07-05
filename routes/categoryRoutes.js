const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController'); // ✅ Required!
// const { createCategory } = require('../controllers/categoryController');
const { createCategoryRules } = require('../validators/categoryValidator');

router.post('/categories', createCategoryRules, categoryController.createCategory);
// GET - All categories
router.get('/categories-all', categoryController.getAllCategories);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
