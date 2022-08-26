const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await userService.createUser({ displayName, email, password, image });

  res.status(201).json({ token: user });
};

const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
};

module.exports = { createUser, getUsers };