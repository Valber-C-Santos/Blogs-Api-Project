const loginService = require('../services/login.service');

const isDisplayNameValid = (displayName) => displayName && displayName.length >= 8;
const isEmailValid = (email) => {
  const REGEX = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
  return email.match(REGEX);
};
const isPasswordValid = (password) => password && password.length >= 6;

const isBodyValid = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (!isDisplayNameValid(displayName)) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (!isEmailValid(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (!isPasswordValid(password)) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }

  const isTheSameEmail = await loginService.findEmail(email);
  if (isTheSameEmail) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};
module.exports = { isBodyValid };
