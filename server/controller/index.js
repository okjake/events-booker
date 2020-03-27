const { serverError } = require('./error/server');
const { clientError } = require('./error/client');
const { registerValidation, newUserExist, addUserToDB } = require('./routes/user/registeration');

module.exports = {
  serverError,
  clientError,
  registerValidation,
  newUserExist,
  addUserToDB,
};
