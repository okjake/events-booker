const { validateAttendence, checkUserBooking, signAttendance } = require('./attendance');
const { pinCodeValidation, getHashedPinCode, createPortalToken } = require('./portalLogainPage');
const portalLogout = require('./portalLogout');


module.exports = {
  validateAttendence,
  checkUserBooking,
  signAttendance,
  pinCodeValidation,
  getHashedPinCode,
  createPortalToken,
  portalLogout,
};
