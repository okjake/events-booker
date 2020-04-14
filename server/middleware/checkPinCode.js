const bcrypt = require('bcrypt');

const checkPinCode = (req, res, next) => {
  const hashPinCode = req.pinCode;
  const { pinCode } = req.body;
  bcrypt.compare(pinCode, hashPinCode).then((valid) => {
    if (!valid) {
      const err = new Error();
      err.msg = 'incorect pin code';
      err.status = 401;
      throw err;
    } else {
      next();
    }
  }).catch((err) => {
    if (err.status === 401) {
      res.status(401).json(err);
    } else {
      next(err);
    }
  });
};

module.exports = checkPinCode;
