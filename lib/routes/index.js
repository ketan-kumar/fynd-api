const express = require('express');
const router = express.Router();

// Controllers
const mainController = require('../controllers/main');
const movieController = require('../controllers/movie');

// Global middlewares
router.use(mainController.initialisation);

// fetching movies
router.get('/movie',
  movieController.fetchMovies
);

module.exports = router;
