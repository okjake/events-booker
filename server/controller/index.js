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
  registerValidation,
  newUserExist,
  addUserToDB,
  getEventDetails,

} = require('./routes/user');

const {
  validateEvent,
  createEvent,
  getUsersEvent,
  getUsersData,
  logout,
  viewEventsOnDate,
  deleteEvent,
  getAdmin,
} = require('./routes/admin');


const {
  validateAttendence,
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
  logout,
  getUsersEvent,
  getUsersData,
  validateEvent,
  createEvent,
  validateAttendence,
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
