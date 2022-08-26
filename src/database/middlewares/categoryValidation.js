const { getCategories } = require('../services/categoryService');
const CustomError = require('./CustomError');

const categoryValidation = async (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    throw new CustomError(400, 'Some required fields are missing');
  }
  const categories = await getCategories(categoryIds);
  if (!categories) throw new CustomError(400, '"categoryIds" not found');

  next();
};

module.exports = { categoryValidation };