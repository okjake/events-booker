const {
  validateAttendance: validateAttendance,
  checkUserBooking,
  signAttendance,
} = require('./attendance');
const {
  pinCodeValidation,
  getHashedPinCode,
  createPortalToken,
} = require('./portalLogainPage');
const portalLogout = require('./portalLogout');

module.exports = {
  validateAttendance,
  checkUserBooking,
  signAttendance,
  pinCodeValidation,
  getHashedPinCode,
  createPortalToken,
  portalLogout,
};
