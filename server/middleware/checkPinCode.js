const bcrypt = require('bcrypt');

const checkPinCode = async (req, res, next) => {
  const hashPinCode = req.pinCode;
  const { pinCode } = req.body;
  try {
    const valid = await bcrypt.compare(pinCode, hashPinCode);
    if (!valid) {
      const err = new Error();
      err.msg = 'incorrect pin code';
      err.status = 403;
      throw err;
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = checkPinCode;
