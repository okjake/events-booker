const getEvents = require('./mainPage');
const getEventDetails = require('./getEvent');
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
  checkAlreadyBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
} = require('./registeration');

module.exports = {
  cancelRegistration,
  getEvents,
  checkUser,
  checkEventExist,
  checkAlreadyBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
  sendSms,
  registerValidation,
  newUserExist,
  addUserToDB,
  getEventDetails,
};
