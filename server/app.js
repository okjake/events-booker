const { join } = require('path');

const express = require('express');
const compression = require('compression');

const router = require('./router');

const app = express();

app.disabled('x-powered-by');
app.use(compression());

app.set('port', process.env.PORT || 8000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, '..', 'client', 'build')));
app.get('/', (req, res) => {
  res.json('test route');
});

// app.get('*', (req, res) => {
//   res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
// });
app.use(router);

module.exports = app;
