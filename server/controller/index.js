const { serverError } = require('./error/server');
const { clientError } = require('./error/client');

const {
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
} = require('./routes/user');

const {
  validateEvent,
  createEvent,
  getEventUsers,
  getUsersData,
  logout,
  viewEventsOnDate,
  deleteEvent,
  getAdmin,
} = require('./routes/admin');

const {
  validateAttendance,
  checkUserBooking,
  signAttendance,
  pinCodeValidation,
  getHashedPinCode,
  createPortalToken,
  portalLogout,
} = require('./routes/portal');

module.exports = {
  serverError,
  clientError,
  signUpUser,
  sendSms,
  checkUser,
  checkEventExist,
  generateCode,
  userWillAttend,
  checkAlreadyBooked,
  sendInvitation,
  cancelRegistration,
  getEvents,
  logout,
  getEventUsers,
  getUsersData,
  validateEvent,
  createEvent,
  validateAttendance,
  checkUserBooking,
  signAttendance,
  deleteEvent,
  viewEventsOnDate,
  pinCodeValidation,
  getHashedPinCode,
  createPortalToken,
  portalLogout,
  getEventDetails,
  getAdmin,
};
