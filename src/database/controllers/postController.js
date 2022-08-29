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

const updatePost = async (req, res) => {
  const { id } = req.params;

  const token = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;
  const { data: { displayName } } = jwt.decode(token, jwtSecret);

  const { title, content } = req.body;
  const update = await PostService.updatePost({ displayName, id, title, content });

  res.status(200).json(update);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  const token = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;
  const { data: { displayName } } = jwt.decode(token, jwtSecret);

  const post = await PostService.getPostById(id);
  if (!post) throw new CustomError(404, 'Post does not exist');

  await PostService.deletePost({ displayName, id });
  res.status(204).json();
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  const posts = await PostService.searchPost(q);
  res.status(200).json(posts);
};

module.exports = { createPost, getPost, getPostById, updatePost, deletePost, searchPost };