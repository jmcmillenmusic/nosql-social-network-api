const { connect, connection } = require('mongoose');
const { MONGO_DB } = require('dotenv');

connect(MONGO_DB);

module.exports = connection;