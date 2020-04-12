const bcrypt = require('bcrypt');

const checkPinCode = (req, res, next) => {
  const hashPinCode = req.pinCode;
  const { pinCode: { pinCode } } = req.body;
  bcrypt.compare(pinCode, hashPinCode).then((valid) => {
    if (!valid) {
      const err = new Error();
      err.msg = 'incorect pinCode';
      err.status = 401;
      next(err);
    } else {
      next();
    }
  }).catch(next);
};


module.exports = checkPinCode;
