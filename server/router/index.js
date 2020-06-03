const router = require('express').Router();

const {
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
  pinCodeValidation,
  getHashedPinCode,
  deleteEvent,
  viewEventsOnDate,
  createPortalToken,
  portalLogout,
  getEventDetails,
  getAdmin,
} = require('../controller');

const {
  validationCancelReg,
  loginValidation,
  checkEmailIfExist,
  checkPassword,
  protectedRoute,
  protectedPortalRoute,
  checkPinCode,
} = require('../middleware');

router.get('/admin', getAdmin);
router.get('/event', getEvents);
router.get('/events/:code', getEventDetails);

router.post('/register', signUpUser);
router.post(
  '/checkUser',
  checkUser,
  checkEventExist,
  checkAlreadyBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
  sendSms
);

router.post('/login', loginValidation, checkEmailIfExist, checkPassword);
router.get('/logout', logout);

router.post('/cancelUser', validationCancelReg, cancelRegistration);

router.post(
  '/portal/login',
  pinCodeValidation,
  getHashedPinCode,
  checkPinCode,
  createPortalToken
);
router.post(
  '/portal/logout',
  pinCodeValidation,
  getHashedPinCode,
  checkPinCode,
  portalLogout
);

router.all(['/event/date', '/attendance'], protectedPortalRoute);
router.get('/event/date', viewEventsOnDate);
router.patch(
  '/attendance',
  validateAttendance,
  checkUserBooking,
  signAttendance
);

router.all(['/users', '/event/:eventCode/users', '/event'], protectedRoute);
router.get('/users', getUsersData);
router.get('/events/:eventCode/users', getEventUsers);
router.patch('/event', deleteEvent);
router.post('/event', validateEvent, createEvent);

router.use(clientError);
router.use(serverError);

module.exports = router;
