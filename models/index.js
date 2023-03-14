const User = require('./User');
const Library = require('./Library');
const Games = require('./Games');

Library.hasMany(Games, {
  foreignKey: 'gallery_id',
});

Games.belongsTo(Library, {
  foreignKey: 'gallery_id',
});

module.exports = { User, Library, Games };