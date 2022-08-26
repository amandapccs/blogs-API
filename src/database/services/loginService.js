const jwt = require('jsonwebtoken');
require('dotenv').config();
const CustomError = require('../middlewares/CustomError');
const { User } = require('../models');

const generateToken = async (userData) => {
  const jwtConfig = {
    expiresIn: '4d',
    algorithm: 'HS256',
  };

  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign({ data: userData }, jwtSecret, jwtConfig);
  return token;
};

const getUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new CustomError(400, 'Some required fields are missing');
  }

  const checkUser = await User.findOne({ where: { email } });

  if (!checkUser || checkUser.password !== password) {
    throw new CustomError(400, 'Invalid fields');
  }

  delete checkUser.dataValues.password;

  const token = generateToken(checkUser.dataValues);
  return token;
};

module.exports = {
  getUser,
};