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
} = require('./routes/user');

const {
  validateEvent,
  createEvent,
  getUsersEvent,
  getUsersData,
  viewEventsOnDate,
} = require('./routes/admin');

const {
  validateAttendence,
  checkUserBooking,
  signAttendance,
} = require('./routes/portal');


module.exports = {
  serverError,
  clientError,
  checkUser,
  checkEventExist,
  generateCode,
  userWillAttend,
  checkAlreadBooked,
  sendInvitation,
  cancelRegistration,
  getEvents,
  getUsersEvent,
  getUsersData,
  validateEvent,
  createEvent,
  validateAttendence,
  checkUserBooking,
  signAttendance,
  viewEventsOnDate,
};
