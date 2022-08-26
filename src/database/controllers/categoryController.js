const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  console.log('name ---->', name);

  const category = await categoryService.createCategory(name);
  console.log('category ---->', category);

  res.status(201).json({ id: category.id, name: category.name });
};

const getCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json(categories);
};

module.exports = { createCategory, getCategories };