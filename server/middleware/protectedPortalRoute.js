const jwt = require('jsonwebtoken');

const protectedPortalRoute = (req, res, next) => {
  jwt.verify(
    req.cookies.portalToken,
    process.env.SECRET_KEY_PORTAL,
    (e, token) => {
      if (e) {
        const error = new Error();
        error.msg = 'un-auth';
        error.status = 401;
        next(error);
      } else {
        req.user = token;
        next();
      }
    }
  );
};
module.exports = protectedPortalRoute;
