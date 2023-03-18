const User = require('./User');
const Library = require('./Library');
const Games = require('./Games');
const Notes = require('./Notes');

Notes.belongsTo(User, {
    foreignKey: 'user_id',
  });

User.hasMany(Notes, {
    foreignKey: 'user_id',
  });

module.exports = { User, Library, Games, Notes };