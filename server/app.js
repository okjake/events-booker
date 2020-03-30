const { join } = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const compression = require('compression');

const router = require('./router');

const app = express();

app.disabled('x-powered-by');
app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.set('port', process.env.PORT || 8000);

app.use(express.static(join(__dirname, '..', 'client', 'build')));
app.use(router);
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
