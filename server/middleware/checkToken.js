const jwt = require('jsonwebtoken');

const checkToken = (req, res) => {
  let token;
  let key;
  if (req.url.split('/')[2] === 'admin') {
    token = req.cookies.token;
    key = process.env.SECRET_KEY;
  } else {
    token = req.cookies.portalToken;
    key = process.env.SECRET_KEY_PORTAL;
  }
  jwt.verify(
    token,
    key,
    (error) => {
      if (error) {
        res.status(401).json({ error: 'unauthenticated' });
      } else {
        res.sendStatus(200);
      }
    },
  );
};

module.exports = checkToken;
