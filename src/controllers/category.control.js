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

module.exports = { createNewCategories };