require('dotenv').config();
const express = require('express');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./models');
const { home, auth, users } = require('./routes');

const app = express();

app.use(express.json());
app.use(expressValidator());
app.use(cookieParser());

app.use('/', home);
app.use('/', auth);
app.use('/users', users);

app.all('/*', (req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

connectDb()
  .then(app.listen(process.env.PORT))
  .catch((err) => { throw err; });

module.exports = app;

// Stretch challenge: how to deploy over https?

// const { join } = require('path');
// const https = require('https');
// const { readFileSync } = require('fs');

// const keyPath = join(__dirname, '..', 'certs', 'selfsigned.key');
// const certPath = join(__dirname, '..', 'certs', 'selfsigned.crt');

// const key = readFileSync(keyPath, 'utf8');
// const cert = readFileSync(certPath, 'utf8');
// const credentials = { key, cert };

// const server = https.createServer(credentials, app);

// server.listen(process.env.PORT);
