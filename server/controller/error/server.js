// eslint-disable-next-line no-unused-vars
exports.server = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send('<h1>500 Server Error</h1>');
};
