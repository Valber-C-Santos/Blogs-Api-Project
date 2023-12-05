const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const key = process.env.JWT_SECRET || 'seusecretdetoken';

const userControlJWT = async (req, res) => {
  const user = await userService.createNewUser(req.body);
  
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const token = jwt.sign({ user: { user } }, key, jwtConfig);

  return res.status(201).json({ token });
};

const takeAllUser = async (_req, res) => {
  try {
    const users = await userService.findAllUser();

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error('Error retrieving users:', err);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { userControlJWT, takeAllUser };
