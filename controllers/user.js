const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../utils/ConflictError');
const BadRequestError = require('../utils/BadRequestError');
const UnauthorizedError = require('../utils/UnauthorizedError');
const NotFoundError = require('../utils/NotFoundError');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcript.hash(password, 10)
    .then(hash => User.create({ name, email, password: hash }))
    .then(({ name, email }) => res.status(200).send({ data: { name, email } }))
    .catch(err => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с такими данными уже существует.'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы неверные данные при создании пользователя.'));
      }

      return next(err);
    })
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { SECRET_KEY = 'mySecretKey' } = process.env;

  User.findUserByCredentials(email, password)
    .then(({ _id, name, email }) => {
      const token = jwt.sign({ _id }, SECRET_KEY, { expiresIn: '7d' });

      if (!token) {
        throw new UnauthorizedError('Передан недействительный токен.');
      }
      res
        .status(200)
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ data: { _id, name, email } })
    })
    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден.'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.updateCurrentUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователь по указанному _id не найден.'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы неверные данные при обновлении пользователя.'));
      } else {
        next(err);
      }
    });
}