const { serverError } = require('./error/server');
const { clientError } = require('./error/client');
const { cancelRegistration } = require('./routes/user');

module.exports = {
  serverError,
  clientError,
  cancelRegistration,
};
