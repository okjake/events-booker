const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const checkPassword = (req, res, next) => {
  const hsashPass = req.adminPassword;
  const { password } = req.body;
  bcrypt.compare(password, hsashPass).then((result) => {
    if (result === false) {
      const err = new Error();
      err.msg = 'incorect password';
      err.status = 401;
      throw err;
    } else {
      const token = jwt.sign({ id: req.adminId }, process.env.SECRET_KEY);
      res.cookie('token', token);
      res.json({ msg: 'logged in successfully' });
    }
  }).catch((err) => {
    const { status } = err;
    switch (status) {
      case 401:
        res.json(err);
        break;
      default: next(err);
    }
  });
};

module.exports = checkPassword;
