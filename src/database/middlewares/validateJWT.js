const jwt = require('jsonwebtoken');
const CustomError = require('./CustomError');
const { User } = require('../models');

const jwtSecret = process.env.JWT_SECRET;

const validateJWT = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new CustomError(401, 'Token not found');

  const decoded = jwt.decode(token, jwtSecret);
  if (!decoded) throw new CustomError(401, 'Expired or invalid token');

  const user = await User.findOne({ where: { email: decoded.data.email } });

  req.user = user;

  next();
};

module.exports = { validateJWT };