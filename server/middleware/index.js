const { validationCancelReg, loginValidation } = require('./validation');
const checkEmailIfExist = require('./checkEmail');
const checkPassword = require('./checkPassword');
const protectedRoute = require('./protectedRoute');

module.exports = {
  validationCancelReg, loginValidation, checkEmailIfExist, checkPassword, protectedRoute,
};
