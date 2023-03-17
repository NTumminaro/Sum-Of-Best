const User = require('./User');
const Library = require('./Library');
const Games = require('./Games');
const Notes = require('./Notes');

Notes.belongsTo(User);

User.hasMany(Notes);

module.exports = { User, Library, Games, Notes };