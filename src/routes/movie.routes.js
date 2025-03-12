const express = require('express');
const { createMovie, getMovies, getNewsMovies, markAsWatched, getUsersWithWatchedMovies } = require('../controllers/movie.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', createMovie);
router.get('/', getMovies);
router.get('/news', getNewsMovies);
router.post('/:id/view', authenticate, markAsWatched);
router.get('/watched', getUsersWithWatchedMovies);

module.exports = router;
