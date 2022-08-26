const jwt = require('jsonwebtoken');
const PostService = require('../services/postService');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const token = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;
  const decoded = jwt.decode(token, jwtSecret);

  const { displayName } = decoded.data;
  await PostService.createPost({ title, content, categoryIds, displayName });
  const post = await PostService.getPost(title);

  res.status(201).json(post);
};

module.exports = { createPost };