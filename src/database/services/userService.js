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

const createUser = async (userData) => {
  const { displayName, email, password, image } = userData;

  const checkUser = await User.findOne({ where: { email } });
  if (checkUser) throw new CustomError(409, 'User already registered');

  const user = await User.create({ displayName, email, password, image });

  const token = generateToken(user);

  return token;
};

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!user) throw new CustomError(404, 'User does not exist');
  return user;
};

module.exports = { createUser, getUsers, getUserById };