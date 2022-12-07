const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthorizedError');
const { unauthorized } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  const { SECRET_KEY = 'mySecretKey' } = process.env;

  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError(unauthorized));
  }

  req.user = payload;

  return next();
};
