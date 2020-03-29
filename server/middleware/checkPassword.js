const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const checkPassword = (req, res, next) => {
  const passwordAdmin = req.adminPassword;
  const { password } = req.body;

  console.log(passwordAdmin, password);
  bcrypt.compare(password, passwordAdmin, (error, result) => {
    console.log(result);
    if (error) { next(error); } else if (result === false) {
      // if password false
      const err = new Error();
      err.msg = 'incorect password';
      err.status = 401;
      next(err);
    } else {
      // if true create cookies /get id for ths email
      const token = jwt.sign({ id: req.adminId }, process.env.SECRET_KEY);
      res.cookie('token', token);
      next();
    }
  });
};

module.exports = { checkPassword };
