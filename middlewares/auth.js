const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthorizedError');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  const { SECRET_KEY = 'mySecretKey' } = process.env;

  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация.'));
  }

  req.user = payload;

  next();
};
