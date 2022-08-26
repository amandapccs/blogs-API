// const { getUserById } = require('../services/userService');
const CustomError = require('./CustomError');

const validateUpdate = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    throw new CustomError(400, 'Some required fields are missing');
  }

  // const { id } = req.params;
  // const findUser = getUserById(id);
  // if (!findUser) throw new CustomError(401, 'Unauthorized user');
  next();
};

module.exports = { validateUpdate };