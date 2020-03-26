// eslint-disable-next-line no-unused-vars
exports.serverError = (err, req, res, next) => {
  res.status(err.status || 500).json({ msg: err.msg, status: err.status });
};
