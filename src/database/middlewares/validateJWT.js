const jwt = require('jsonwebtoken');
const CustomError = require('./CustomError');

const jwtSecret = process.env.JWT_SECRET;

const validateJWT = async (req, _res, next) => {
    const token = req.headers.authorization;

  if (!token) throw new CustomError(401, 'Token not found');

    const decoded = jwt.decode(token, jwtSecret);
    if (!decoded) throw new CustomError(401, 'Expired or invalid token');

    next();
};

module.exports = { validateJWT };