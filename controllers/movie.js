const Movie = require('../models/movie');
const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/NotFoundError');
const ForbiddenError = require('../utils/ForbiddenError');

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
        next(new BadRequestError('Переданы неверные данные при создании фильма.'));
      } else {
        next(err);
      }
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
    .orFail(new NotFoundError('Фильм с указанным _id не найден.'))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Удалять можно только свои фильмы.');
      }
      movie.remove();
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы неверные данные при удалении фильма.'));
      } else {
        next(err);
      }
    });
};
