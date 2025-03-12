const { Movie, Category, UserMovie } = require('../models');
const { Op } = require('sequelize');

exports.createMovie = async (req, res) => {
  try {
    const { title, releaseDate, categoryId } = req.body;
    const movie = await Movie.create({ title, releaseDate, CategoryId: categoryId });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la película' });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const { title, categoryId, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const where = {};

    if (title) where.title = { [Op.iLike]: `%${title}%` };
    if (categoryId) where.CategoryId = categoryId;

    const movies = await Movie.findAndCountAll({
      where,
      include: [{ model: Category }],
      order: [['releaseDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      total: movies.count,
      pages: Math.ceil(movies.count / limit),
      movies: movies.rows,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener películas' });
  }
};

exports.getNewsMovies = async (req, res) => {
  try {
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

    const movies = await Movie.findAll({
      where: { releaseDate: { [Op.gt]: threeWeeksAgo } },
      order: [['releaseDate', 'DESC']],
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener novedades' });
  }
};

exports.markAsWatched = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    const userMovie = await UserMovie.create({ UserId: userId, MovieId: id });
    res.status(201).json(userMovie);
  } catch (error) {
    res.status(500).json({ error: 'Error al marcar película como vista' });
  }
};

exports.getUsersWithWatchedMovies = async (req, res) => {
  try {
    const usersWithMovies = await UserMovie.findAll({
      include: [{ model: Movie }],
    });

    res.json(usersWithMovies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios con películas vistas' });
  }
};
