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

const getUsersById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  res.status(200).json(user);
};

module.exports = { createUser, getUsers, getUsersById };