// Declares initial required variables
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Establishes our port and instantiates Express
const PORT = 3001;
const app = express();

// Connects the middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Listens for the port and sends that information to the console
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});