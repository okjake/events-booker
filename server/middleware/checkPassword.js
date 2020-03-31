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
      next(err);
    } else {
      const token = jwt.sign({ id: req.adminId }, process.env.SECRET_KEY);
      res.cookie('token', token);
      next();
    }
  }).catch(next);
};
module.exports = checkPassword;
// to make password to admin hash password(req.body)
// bcrypt.hash(password, 10, (err, hash) => {
//   if (err) { throw (err); }
//   console.log(hash);
// });
