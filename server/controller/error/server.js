exports.serverError = (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({ msg: err.msg || 'Something went wrong, try again later' });
};
