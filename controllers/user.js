const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ConflictError = require("../utils/ConflictError");
const BadRequestError = require("../utils/BadRequestError");
const NotFoundError = require("../utils/NotFoundError");
const { ok } = require("../utils/status");
const { ERROR_MESSAGES } = require("../utils/constants");

const { conflict, userCreateBadRequest, userNotFound, userUpdateBadRequest } =
  ERROR_MESSAGES;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(ok).send({
        data: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(conflict));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError(userCreateBadRequest));
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { SECRET_KEY = "mySecretKey" } = process.env;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: "7d",
      });

      res
        .status(ok)
        .cookie("token", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ name: user.name, email: user.email, _id: user._id });
    })
    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(userNotFound))
    .then((user) => {
      res.status(ok).send(user);
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
    }
  )
    .orFail(new NotFoundError(userNotFound))
    .then((user) => res.status(ok).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(conflict));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError(userUpdateBadRequest));
      }
      return next(err);
    });
};

module.exports.logout = (req, res) => {
  res.status(ok).clearCookie("token").end();
};
