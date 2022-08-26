const CustomError = require('../middlewares/CustomError');
const { Category } = require('../models');

const createCategory = async (name) => {
  if (!name) throw new CustomError(400, '"name" is required');

  const category = await Category.create({ name });

  return category;
};

const getCategories = async (...ids) => {
  const { count } = await Category.findAndCountAll({ where: { id: [...ids] } });
  if (count < [...ids].length) return;
  return true;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = { createCategory, getCategories, getAllCategories };