const { ERROR_MESSAGES } = require('./constants');
const { error } = require('./status');

const errorHandler = (err, req, res, next) => {
  const { statusCode = error, message = ERROR_MESSAGES.serverError } = err;

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
