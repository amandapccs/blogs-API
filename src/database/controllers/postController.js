const jwt = require('jsonwebtoken');
const PostService = require('../services/postService');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const token = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;
  const decoded = jwt.decode(token, jwtSecret);

  const { displayName } = decoded.data;
  await PostService.createPost({ title, content, categoryIds, displayName });
  const post = await PostService.getPostByTitle(title);

  res.status(201).json(post);
};

const getPost = async (req, res) => {
  const posts = await PostService.getPost();
  res.status(200).json(posts);
};

module.exports = { createPost, getPost };