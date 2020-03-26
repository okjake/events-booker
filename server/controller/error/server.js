// eslint-disable-next-line no-unused-vars
exports.server = (err, req, res, next) => {
  res.status(err.status || 500).json({ msg: err.msg });
};
