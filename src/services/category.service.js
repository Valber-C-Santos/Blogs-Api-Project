const { Category } = require('../models');
const db = require('../models');

const createNewCategory = async (name) => {
  try {
    const createCategoryName = Category.create({ name });
    return createCategoryName;
  } catch (error) {
    console.error({ message: 'erro no service' });
  }
};

const findAllCategories = async () => {
  try {
    const findAll = db.Category.findAll();
    return findAll;
  } catch (error) {
    console.error({ message: 'Erro no service' });
  }
};

module.exports = {
  createNewCategory,
  findAllCategories,
};