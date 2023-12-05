const jwt = require('jsonwebtoken');
const { createNewUser, findAllUser, takeUserId } = require('../services/user.service');

const key = process.env.JWT_SECRET || 'seusecretdetoken';

const userControlJWT = async (req, res) => {
  const user = await createNewUser(req.body);
  
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const token = jwt.sign({ user: { user } }, key, jwtConfig);

  return res.status(201).json({ token });
};

const takeAllUser = async (_req, res) => {
  try {
    const { status, data } = await findAllUser();

    if (data.length === 0) {
      return res.status(status).json({ message: 'No users found' });
    }

    res.status(status).json(data);
  } catch (err) {
    console.error('Error retrieving users:', err);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const findUserId = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await takeUserId(id);
  return res.status(status).json(data);
};

module.exports = { userControlJWT, takeAllUser, findUserId };
