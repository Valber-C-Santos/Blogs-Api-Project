const jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET || 'seusecretdetoken';

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

const isValidToken = async (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, key);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  isValidToken,
};