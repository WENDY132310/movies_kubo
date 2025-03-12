const sequelize = require('../config/database');
const User = require('./user.model');
const Category = require('./category.model');
const Movie = require('./movie.model');
const UserMovie = require('./userMovie.model');

User.hasMany(UserMovie);
UserMovie.belongsTo(User);

Movie.hasMany(UserMovie);
UserMovie.belongsTo(Movie);

Category.hasMany(Movie);
Movie.belongsTo(Category);

module.exports = { sequelize, User, Category, Movie, UserMovie };
