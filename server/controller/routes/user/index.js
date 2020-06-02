const getEvents = require('./mainPage');
const getEventDetails = require('./getEventDetails');
const cancelRegistration = require('./cancelRegistration');
const sendSms = require('./sendSmsMsg');
const signUpUser = require('./registerNewUser');
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
  signUpUser,
  getEventDetails,
};
