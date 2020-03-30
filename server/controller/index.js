const { serverError } = require('./error/server');
const { clientError } = require('./error/client');
const {
  checkUser, checkEventExist, generateCode, userWillAttend, checkAlreadBooked, sendInvitation,
} = require('./routes/user/registeration');
const { cancelRegistration, getEvents } = require('./routes/user');
const { validateEvent, createEvent } = require('./routes/admin');
const { validateAttendence, checkUserBooking, signAttendance } = require('./routes/portal');
const { deleteEvent } = require('./routes/user/eventPage');


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
  validateEvent,
  createEvent,
  validateAttendence,
  checkUserBooking,
  signAttendance,
  deleteEvent,
};
