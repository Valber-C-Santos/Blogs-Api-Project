const { Category } = require('../models');

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
    const findAll = Category.findAll();
    return findAll;
  } catch (error) {
    console.error({ message: 'Erro no service' });
  }
};

const findCategoryById = (id) => Category.findOne({ where: { id } });

module.exports = {
  createNewCategory,
  findAllCategories,
  findCategoryById,
};