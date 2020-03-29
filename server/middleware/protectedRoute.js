const jwt = require('jsonwebtoken');

const protectedRoute = (req, res, next) => {
  if (!req.cookies.token) {
    res.status(401).redirect('/');
  } else {
    const verified = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    res.user = verified;
    next();
  }
};
module.exports = { protectedRoute };
