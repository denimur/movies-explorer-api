const router = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movie');
const { celebrateMovieParams, celebrateCreateMovie } = require('../utils/validation');

router.post('/', celebrateCreateMovie(), createMovie);
router.get('/', getMovies);
router.delete('/:id', celebrateMovieParams(), deleteMovie);

module.exports = router;
