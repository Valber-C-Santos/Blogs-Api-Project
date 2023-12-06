const { Category } = require('../models');

const createNewCategory = async (name) => {
  try {
    const createCategoryName = Category.create({ name });
    return createCategoryName;
  } catch (error) {
    console.error({ message: 'erro no service' });
  }
};

module.exports = {
  createNewCategory,
};