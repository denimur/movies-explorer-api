const { celebrate } = require("celebrate");
const Joi = require("joi");

function celebrateCreateUser() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  });
}

function celebrateLogin() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  });
}

function celebrateUpdateUser() {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  });
}

function celebrateMovieParams() {
  return celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().hex().length(24),
    }),
  });
}

function celebrateCreateMovie() {
  return celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#?$/),
      trailerLink: Joi.string()
        .required()
        .pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#?$/),
      thumbnail: Joi.string()
        .required()
        .pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#?$/),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number().required(),
    }),
  });
}

module.exports = {
  celebrateUpdateUser,
  celebrateCreateMovie,
  celebrateMovieParams,
  celebrateCreateUser,
  celebrateLogin,
};
