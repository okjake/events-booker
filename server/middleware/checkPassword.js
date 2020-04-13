const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const checkPassword = (req, res, next) => {
  const hsashPass = req.adminPassword;
  const { password } = req.body;
  bcrypt.compare(password, hsashPass).then((result) => {
    if (result === false) {
      const err = new Error();
      err.msg = 'incorrect password';
      err.status = 401;
<<<<<<< HEAD
      throw (err);
||||||| merged common ancestors
      next(err);
=======
      throw err;
>>>>>>> 730399c57d09eb4fa87883a9c873ff143e5774d5
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
