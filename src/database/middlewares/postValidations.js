// const { getUserById } = require('../services/userService');
const CustomError = require('./CustomError');

const validateUpdate = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    throw new CustomError(400, 'Some required fields are missing');
  }
  next();
};

module.exports = { validateUpdate };