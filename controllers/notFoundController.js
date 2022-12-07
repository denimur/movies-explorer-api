const NotFoundError = require('../utils/NotFoundError');
const { sourceNotFound } = require('../utils/constants').default;

module.exports.notFoundController = (req, res, next) => {
  next(new NotFoundError(sourceNotFound));
};
