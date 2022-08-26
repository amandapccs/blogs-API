const jwt = require('jsonwebtoken');
const CustomError = require('../middlewares/CustomError');
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

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await PostService.getPostById(id);
  if (!post) throw new CustomError(404, 'Post does not exist');
  res.status(200).json(post);
};

module.exports = { createPost, getPost, getPostById };