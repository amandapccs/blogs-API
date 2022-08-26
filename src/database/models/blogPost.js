module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    content: { type: DataTypes.STRING, unique: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
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