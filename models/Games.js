const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Games extends Model {}

Games.init(
  {
    gameID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    gameTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gameReleaseDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gameImageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gameNotes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gallery_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'gallery',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'games',
  }
);

module.exports = Games;
