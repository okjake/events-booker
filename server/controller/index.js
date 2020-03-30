const { serverError } = require('./error/server');
const { clientError } = require('./error/client');


const {
  cancelRegistration,
  getEvents,
  checkUser,
  checkEventExist,
  checkAlreadBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
  sendSms,
} = require('./routes/user');

const {
  validateEvent,
  createEvent,
  getUsersEvent,
  getUsersData,
  viewEventsOnDate,
  login,
} = require('./routes/admin');

const {
  validateAttendence,
  checkUserBooking,
  signAttendance,
} = require('./routes/portal');


module.exports = {
  serverError,
  clientError,
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
  viewEventsOnDate,
};
