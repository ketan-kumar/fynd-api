const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth');
const mainController = require('../controllers/main');
const moviesController = require('../controllers/movies');

// Global middlewares
router.use(mainController.initialisation);

// to fetch movies
router.get('/movie',
  moviesController.fetchMovies
);

// to save movies
router.post('/movie',
  authController.authenticate,
  moviesController.saveMovies
);

// to update movies
router.patch('/movie',
  authController.authenticate,
  moviesController.updateMovies
);

// to delete movies
router.delete('/movie/:id',
  authController.authenticate,
  moviesController.deleteMovies
);

module.exports = router;
