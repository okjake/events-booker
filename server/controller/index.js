const { serverError } = require('./error/server');
const { clientError } = require('./error/client');
const {
  registerValidation,
  newUserExist,
  generatCode,
  addUserToDB,
} = require('./routes/user/registerNewUser');
const { sendSms } = require('./routes/user/sendSmsMsg');

module.exports = {
  serverError,
  clientError,
  registerValidation,
  newUserExist,
  generatCode,
  addUserToDB,
  sendSms,
};
