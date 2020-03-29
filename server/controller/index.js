const { serverError } = require('./error/server');
const { clientError } = require('./error/client');
const {
  checkUser, checkEventExist, generateCode, userWillAttend, checkAlreadBooked, sendInvitation,
} = require('./routes/user/registeration');
const { cancelRegistration, getEvents } = require('./routes/user');
const { login } = require('./routes/admin');

module.exports = {
  serverError,
  clientError,
  checkUser,
  checkEventExist,
  checkAlreadBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
  cancelRegistration,
  getEvents,
  login,
};
