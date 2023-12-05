const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const key = process.env.JWT_SECRET || 'seusecretdetoken';

const userControlJWT = async (req, res) => {
  const user = await userService.createNewUser(req.body);
  
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const token = jwt.sign({ user: { user } }, key, jwtConfig);

  return res.status(201).json({ token });
};

module.exports = { userControlJWT };