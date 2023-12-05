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
    return { status: 200, data: findall };
  } catch (error) {
    console.error(error);
  }
};

const takeUserId = async (id) => {
  try {
    const takeId = await db.User.findOne({ where: { id }, attributes: { exclude: 'password' } });
    if (!takeId) {
      return { status: 404, data: { message: 'User does not exist' } };
    }
    return { status: 200, data: takeId };
  } catch (error) {
    console.error({ message: 'O erro esta aqui ' });
  }
};

module.exports = { 
  createNewUser,
  findAllUser,
  takeUserId,
};