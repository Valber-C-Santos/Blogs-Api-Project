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

module.exports = { 
  createNewUser,
};