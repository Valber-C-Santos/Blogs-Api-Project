const categoryService = require('../services/category.service');

const createNewCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryService.createNewCategory(name);

    return res.status(201).json({ name: category.name });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const takeAllCategories = async (_req, res) => {
  try {
    const allCategories = await categoryService.findAllCategories();
    res.status(200).json(allCategories);
  } catch (err) {
    console.error('Error retrieving category:', err);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createNewCategories, takeAllCategories };