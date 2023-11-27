const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#?$/gi,
  },
  trailerLink: {
    type: String,
    required: true,
    match: /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#?$/gi,
  },
  thumbnail: {
    type: String,
    required: true,
    match: /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#?$/gi,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = model("movie", movieSchema);
