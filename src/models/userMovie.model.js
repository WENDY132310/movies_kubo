const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserMovie = sequelize.define('UserMovie', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
});

module.exports = UserMovie;
