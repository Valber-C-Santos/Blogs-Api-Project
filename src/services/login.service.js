const { User } = require('../models');

const findEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.error('Erro ao buscar usuário por e-mail:', error);
    throw error;
  }
};

module.exports = { findEmail };