const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notes extends Model {}

Notes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gameId: {
      type: DataTypes.INTEGER,
      unique: false,
      references: {
        model: 'games',
        key: 'gameid'
      }
    },
    userId: {
        type: DataTypes.INTEGER,
        unique: false,
        references: {
          model: 'users',
          key: 'userid'
        }
      },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'notes',
  }
);

module.exports = Notes;