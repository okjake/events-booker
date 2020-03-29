const { validationCancelReg, loginValidation } = require('./validation');
const { checkEmailIfExist } = require('./checkEmail');
const { checkPassword } = require('./checkPassword');

module.exports = {
  validationCancelReg, loginValidation, checkEmailIfExist, checkPassword,
};
