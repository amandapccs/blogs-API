module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: { type: DataTypes.STRING, unique: true },
    userId: DataTypes.INTEGER,
    updated: DataTypes.DATE,
    published: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { 
      foreignKey: 'userId',
      otherKey: 'users', });
  };

  return BlogPost;
};