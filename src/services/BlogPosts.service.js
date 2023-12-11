const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const findAllPosts = () => BlogPost.findAll();

const findOneByCategoryId = (id) => BlogPost.findOne(id);

const createNewPost = async ({ title, content, userId, updated, published, categoryId }) => {
  try {
    const newPost = await BlogPost.create({ 
      title,
      content,
      userId,
      updated,
      published,
      categoryId, 
    });
    return newPost;
  } catch (error) {
    console.error({ message: 'Erro no CreateNewPost', error });
    throw error;
  }
};

const inputPost = async ({ title, content, userId, categoryIds }) => {
  const newDate = new Date();
  const resultPost = await sequelize.transaction(async (data) => {
    const newPost = await BlogPost.create({ 
      title,
      content,
      userId,
      updated: newDate,
      published: newDate, 
    }, { transaction: data });

    const idPost = newPost.id;

    await Promise.all(categoryIds.map(async (categoryId) => {
      await PostCategory.create({ idPost, categoryId }, { transaction: data }); 
    }));
    return newPost;
  });
  return resultPost;
};

module.exports = {
  createNewPost,
  findAllPosts,
  findOneByCategoryId,
  inputPost,

};