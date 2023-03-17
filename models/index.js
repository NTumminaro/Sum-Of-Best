const User = require('./User');
const Library = require('./Library');
const Games = require('./Games');
const Notes = require('./Notes');

Notes.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Notes, {foreignKey: 'userId'});

module.exports = { User, Library, Games, Notes };