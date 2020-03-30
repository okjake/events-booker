const getEvents = require('./mainPage');
const cancelRegistration = require('./cancelRegistration');
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
};
