const CustomError = require('./CustomError');

const userValidations = (req, _res, next) => {
  const { email, password, displayName } = req.body;
  const regexEmail = new RegExp('^(.+)@(.+)$');
  if (!regexEmail.test(email)) {
    throw new CustomError(400, '"email" must be a valid email');
  }

  if (password.length < 6) {
    throw new CustomError(400, '"password" length must be at least 6 characters long');
  }

  if (displayName.length < 8) {
    throw new CustomError(400, '"displayName" length must be at least 8 characters long');
  }
  next();
};

module.exports = { userValidations };