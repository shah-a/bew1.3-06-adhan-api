require('dotenv').config();
const express = require('express');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./models');
const { checkAuth, requireAuth } = require('./middleware');
const { home, auth } = require('./controllers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(checkAuth);

app.use('/', home);
app.use('/', auth);

connectDb()
  .then(app.listen(process.env.PORT))
  .catch(err => { throw err });

module.exports = app;
