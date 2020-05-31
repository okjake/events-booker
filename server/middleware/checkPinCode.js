const bcrypt = require('bcrypt');

// refactor promise to await async
const checkPinCode = (req, res, next) => {
  const hashPinCode = req.pinCode;
  const { pinCode } = req.body;
  bcrypt.compare(pinCode, hashPinCode).then((valid) => {
    if (!valid) {
      const err = new Error();
      err.msg = 'incorect pin code';
      err.status = 403;
      throw err;
    } else {
      next();
    }
  }).catch((err) => {
    next(err);
  });
};

module.exports = checkPinCode;
