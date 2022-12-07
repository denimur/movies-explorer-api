const Movie = require('../models/movie');
const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/NotFoundError');
const ForbiddenError = require('../utils/ForbiddenError');
const {
  movieCreateBadRequest, movieDeleteBadRequest, movieDeleteForbidden, movieNotFound,
} = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  const ownerId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: ownerId,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(movieCreateBadRequest));
      }
      return next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  const ownerId = req.user._id;

  Movie.find({ owner: ownerId })
    .populate('owner')
    .then((movies) => res.status(200).send({ data: movies }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError(movieNotFound))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError(movieDeleteForbidden);
      }
      movie.remove();
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(movieDeleteBadRequest));
      }
      return next(err);
    });
};
