const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = mongoose.createConnection('mongodb://localhost/LetsChat');

module.exports.db = mongoose.connection;
module.exports.Schema = mongoose.Schema;