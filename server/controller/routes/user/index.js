const getEvents = require('./mainPage');
const cancelRegistration = require('./cancelRegistration');
const sendSms = require('./sendSmsMsg');
const {
  registerValidation,
  newUserExist,
  addUserToDB,
} = require('./registerNewUser');
const {
  checkUser,
  checkEventExist,
  checkAlreadBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
} = require('./registeration');

module.exports = {
  cancelRegistration,
  getEvents,
  checkUser,
  checkEventExist,
  checkAlreadBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
  sendSms,
  registerValidation,
  newUserExist,
  addUserToDB,
};
