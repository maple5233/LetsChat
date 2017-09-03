const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connectionString = 'mongodb://localhost/LetsChat';

const options = {
    server: {
        auto_reconnect: true,
        poolSize: 10
    }
};


module.exports = mongoose.createConnection(connectionString, options);

module.exports.db = mongoose.connection;
module.exports.Schema = mongoose.Schema;