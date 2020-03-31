const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const checkPinCode = (req, res, next) => {
  const hashPinCode = req.pinCode;
  const { pinCode } = req.body;
  bcrypt.compare(pinCode, hashPinCode).then((valid) => {
    if (!valid) {
      const err = new Error();
      err.msg = 'incorect pinCode';
      err.status = 401;
      next(err);
    } else {
      const token = jwt.sign({ id: req.admin.id }, process.env.SECRET_KEY_PORTAL);
      res.cookie('portalToken', token);
      // next();
      res.send('Hi');
    }
  }).catch(next);
};


module.exports = checkPinCode;
