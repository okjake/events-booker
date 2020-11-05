const { validationCancelReg, loginValidation } = require('./validation');

const checkEmailIfExist = require('./checkEmail');
const checkPassword = require('./checkPassword');
const protectedRoute = require('./protectedRoute');

const protectedPortalRoute = require('./protectedPortalRoute');
const checkPinCode = require('./checkPinCode');

const checkToken = require('./checkToken');

module.exports = {
  validationCancelReg,
  loginValidation,
  checkEmailIfExist,
  checkPassword,
  protectedRoute,
  protectedPortalRoute,
  checkPinCode,
  checkToken,
};
