const express = require('express');
const { join } = require('path');
const compression = require('compression');

const app = express();

app.disabled('x-powered-by');
app.use(compression());

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
