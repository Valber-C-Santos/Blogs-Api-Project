const db = require('../models');

const createNewUser = async ({ displayName, email, password, image }) => {
  try {
    const user = await db.User.create({ displayName, email, password, image });
    return { status: 201, data: user };
  } catch (error) {
    console.error({ message: 'cannot create new user' });
    throw error;
  }
};

const findAllUser = async () => {
  try {
    const findall = await db.User.findAll({ attributes: { exclude: ['password'] } });
    return findall;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { 
  createNewUser,
  findAllUser,
};