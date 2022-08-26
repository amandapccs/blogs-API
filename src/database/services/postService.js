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
      { model: Category, as: 'categories' },
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

module.exports = { createPost, getPostByTitle, getPost, getPostById };