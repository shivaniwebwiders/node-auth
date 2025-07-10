const CategoryRepository = require('../repositories/categoryRepository');

exports.createCategory = async ({ name, description }) => {
  const existing = await CategoryRepository.findByName(name);
  if (existing.length > 0) {
    return { exists: true };
  }

  const result = await CategoryRepository.create({ name, description });
  return { id: result.insertId };
};

exports.getAllCategories = async () => {
  return await CategoryRepository.findAll();
};

exports.getCategoryById = async (id) => {
  const rows = await CategoryRepository.findById(id);
  return rows[0];
};

exports.updateCategory = async (id, data) => {
  const existing = await CategoryRepository.findById(id);
  if (existing.length === 0) {
    return null;
  }

  await CategoryRepository.update(id, data);
  return true;
};

exports.deleteCategory = async (id) => {
  const result = await CategoryRepository.delete(id);
  return result.affectedRows > 0;
};