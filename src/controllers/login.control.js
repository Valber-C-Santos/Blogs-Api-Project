const jwt = require('jsonwebtoken');
const loginService = require('../services/login.service');

const key = process.env.JWT_SECRET || 'seusecretdetoken';

const isBodyValid = (email, password) => email && password;

const validationLoginControlJWT = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isBodyValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const userEmail = await loginService.findEmail(email);

    if (!userEmail || userEmail.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const loginAndPassword = { sub: userEmail.id, role: 'user' };

    const token = jwt.sign(loginAndPassword, key, jwtConfig);

    const tokenString = token.toString();
    
    res.status(200).json({ token: tokenString });
  } catch (err) {
    return res.status(500).json({ message: 'Internal error', error: err.message });
  }
};

module.exports = validationLoginControlJWT;