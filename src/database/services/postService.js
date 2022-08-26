const CustomError = require('../middlewares/CustomError');
const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

const getUser = async (displayName) => {
  const user = await User.findOne({ where: { displayName } });
  const { id } = user;
  return id;
};

const getPost = async () => {
  const posts = await BlogPost.findAll({ 
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' },
  ] });
  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

const getPostByTitle = async (title) => {
  const post = await BlogPost.findOne({ where: { title } });
  return post;
};

const createPost = async ({ title, content, categoryIds, displayName }) => {
  const userId = await getUser(displayName);

  const transactionResult = await sequelize.transaction(async (t) => {
  const blogPost = await BlogPost.create({ title, content, userId }, { t });
  const categories = categoryIds
    .map((category) => ({ postId: blogPost.dataValues.id, categoryId: category }));

  await PostCategory.bulkCreate(categories, { t });
  return blogPost;
  });

  return transactionResult;
};

const updatePost = async ({ displayName, id, title, content }) => {
  const userId = await getUser(displayName);
  const { dataValues: { user } } = await getPostById(id);
  if (userId !== user.id) throw new CustomError(401, 'Unauthorized user');

  await BlogPost.update({ title, content }, { where: { id } });

  const updatedPost = await getPostById(id);
  return updatedPost;
};

const deletePost = async ({ displayName, id }) => {
  const userId = await getUser(displayName);
  const { dataValues: { user } } = await getPostById(id);
  if (userId !== user.id) throw new CustomError(401, 'Unauthorized user');

  await BlogPost.destroy({ where: { id } });
};

module.exports = { createPost, getPostByTitle, getPost, getPostById, updatePost, deletePost };