const { serverError } = require('./error/server');
const { clientError } = require('./error/client');
const { sendSms } = require('./routes/user/sendSmsMsg');
const { cancelRegistration, getEvents } = require('./routes/user');

const {
  registerValidation,
  newUserExist,
  addUserToDB,
  getUserID,
} = require('./routes/user/registerNewUser');

const {
  checkUser,
  checkEventExist,
  generateCode,
  userWillAttend,
  checkAlreadBooked,
  sendInvitation,
} = require('./routes/user/registeration');

module.exports = {
  serverError,
  clientError,
  registerValidation,
  newUserExist,
  addUserToDB,
  getUserID,
  sendSms,
  checkUser,
  checkEventExist,
  checkAlreadBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
  cancelRegistration,
  getEvents,
};
