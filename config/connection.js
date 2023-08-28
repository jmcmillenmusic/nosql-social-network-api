const { connect, connection } = require('mongoose');
require('dotenv').config();

connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qmyc006.mongodb.net/${process.env.DB_NAME}`);

module.exports = connection;