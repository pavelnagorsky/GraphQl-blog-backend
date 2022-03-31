const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const headers = require('../middleware/headers');
// routes
const routes = require('../routes/index');

const app = express();

module.exports = () => {
  // data parsers config
  app.use(bodyParser.json());
  app.use(multer.single('image'));

  // headers config
  app.use(headers);

  // static dir
  app.use("/images", express.static('images'));

  // bearer token decoding 
  app.use(auth);
  // require routes
  app.use('/', routes);

  // error handling
  app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
  });

  return app;
}