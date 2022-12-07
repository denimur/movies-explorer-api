const NotFoundError = require('../utils/NotFoundError');
const { sourceNotFound } = require('../utils/constants');

module.exports.notFoundController = (req, res, next) => {
  next(new NotFoundError(sourceNotFound));
};
