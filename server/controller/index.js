const { serverError } = require('./error/server');
const { clientError } = require('./error/client');
const { checkUser, checkEventExist } = require('./routes/user/registeration');

module.exports = {
  serverError,
  clientError,
  checkUser,
  checkEventExist,
};
