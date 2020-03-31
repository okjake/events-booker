const { serverError } = require('./error/server');
const { clientError } = require('./error/client');
const { sendSms } = require('./routes/user/sendSmsMsg');
const { cancelRegistration, getEvents } = require('./routes/user');

const {
  registerValidation,
  newUserExist,
  addUserToDB,
} = require('./routes/user/registerNewUser');

const {
  checkUser,
  checkEventExist,
  generateCode,
  userWillAttend,
  checkAlreadBooked,
  sendInvitation,
} = require('./routes/user/registeration');

const {
  login,
  validateEvent,
  createEvent,
  getUsersEvent,
  getUsersData,
  pinCodeValidation,
  getHashedPinCode,
} = require('./routes/admin');

const { validateAttendence, checkUserBooking, signAttendance } = require('./routes/portal');


module.exports = {
  serverError,
  clientError,
  registerValidation,
  newUserExist,
  addUserToDB,
  sendSms,
  checkUser,
  checkEventExist,
  generateCode,
  userWillAttend,
  checkAlreadBooked,
  sendInvitation,
  cancelRegistration,
  getEvents,
  login,
  getUsersEvent,
  getUsersData,
  validateEvent,
  createEvent,
  validateAttendence,
  checkUserBooking,
  signAttendance,
  pinCodeValidation,
  getHashedPinCode,
};
