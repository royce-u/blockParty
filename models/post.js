'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    headline: DataTypes.STRING,
    content: DataTypes.TEXT,
    location: DataTypes.TEXT,
    image: DataTypes.STRING,
    incType: DataTypes.STRING
  }, {});
  post.associate = function(models) {
    // associations can be defined here
    models.post.belongsTo(models.user)
    models.post.belongsTo(models.category)
    models.post.hasMany(models.comment)

  };
  return post;
};