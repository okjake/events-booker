const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const checkPassword = (req, res, next) => {
  const hashPass = req.adminPassword;
  const { password } = req.body;
  bcrypt
    .compare(password, hashPass)
    .then((result) => {
      if (result === false) {
        const err = new Error();
        err.msg = 'incorrect password';
        err.status = 403;
        throw err;
      } else {
        const token = jwt.sign({ id: req.adminId }, process.env.SECRET_KEY);
        res.cookie('token', token);
        res.json({ msg: 'logged in successfully' });
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = checkPassword;
