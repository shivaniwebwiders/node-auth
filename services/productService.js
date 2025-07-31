const ProductRepository = require('../repositories/productRepository');
const CategoryRepository = require('../repositories/categoryRepository');

exports.createProduct = async (data) => {
  const { sku, categoryId } = data;

  const existing = await ProductRepository.findBySKU(sku);
  if (existing.length > 0) return { exists: true };

  const category = await CategoryRepository.findById(categoryId);
  if (category.length === 0) {
    throw { status: 400, message: 'Invalid categoryId. Category does not exist.' };
  }

  const result = await ProductRepository.create(data);
  return { id: result.insertId };
};

exports.getAllProducts = async () => {
  return await ProductRepository.findAll();
};

exports.updateProduct = async (id, data) => {
  return await ProductRepository.update(id, data);
};

exports.deleteProduct = async (id) => {
  return await ProductRepository.delete(id);
};
