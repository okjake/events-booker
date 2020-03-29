const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const checkPassword = (req, res, next) => {
  const hsashPass = req.adminPassword;
  const { password } = req.body;
  console.log(hsashPass, password);
  bcrypt.compare(password, hsashPass, (error, result) => {
    console.log(result);
    if (error) { next(error); } else if (result === false) {
      const err = new Error();
      err.msg = 'incorect password';
      err.status = 401;
      next(err);
    } else {
      const token = jwt.sign({ id: req.adminId }, process.env.SECRET_KEY);
      res.cookie('token', token);
      next();
    }
  });
};

module.exports = { checkPassword };
