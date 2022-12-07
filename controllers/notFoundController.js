const NotFoundError = require('../utils/NotFoundError');
const { ERROR_MESSAGES } = require('../utils/constants');

module.exports.notFoundController = (req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGES.sourceNotFound));
};
