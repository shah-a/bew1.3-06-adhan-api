require('dotenv').config();
const express = require('express');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./models');
const { checkAuth } = require('./middleware');
const { auth, user } = require('./controllers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(checkAuth);

app.use('/', auth);
app.use('/user', user);

connectDb()
  .then(app.listen(process.env.PORT))
  .catch((err) => { throw err; });

module.exports = app;

// Stretch challenge: how to deploy over https?

// const https = require('https');
// const { readFileSync } = require('fs');

// const key = readFileSync(`${__dirname}/../certs/selfsigned.key`, 'utf8');
// const cert = readFileSync(`${__dirname}/../certs/selfsigned.crt`, 'utf8');
// const credentials = { key, cert };

// const server = https.createServer(credentials, app);

// server.listen(process.env.PORT);
