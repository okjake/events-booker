const jwt = require('jsonwebtoken');

const protectedRoute = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.SECRET_KEY, (e, token) => {
    if (e) {
      const error = new Error();
      error.msg = 'un-auth';
      error.status = 401;
      next(error);
    } else {
      req.user = token;
      next();
    }
  });
};
module.exports = { protectedRoute };
