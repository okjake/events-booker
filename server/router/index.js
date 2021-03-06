const router = require('express').Router();

const {
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

router.post(
  '/register',
  registerValidation,
  newUserExist,
  addUserToDB,
  checkEventExist,
  generateCode,
  userWillAttend,
  sendInvitation,
  sendSms,
);
router.post(
  '/checkUser',
  checkUser,
  checkEventExist,
  checkAlreadBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
  sendSms,
);

router.post('/login', loginValidation, checkEmailIfExist, checkPassword);
router.get('/logout', logout);

router.post('/cancelUser', validationCancelReg, cancelRegistration);

router.post('/portal/login', pinCodeValidation, getHashedPinCode, checkPinCode, createPortalToken);
router.post('/portal/logout', pinCodeValidation, getHashedPinCode, checkPinCode, portalLogout);

router.all(['/event/date', '/attendance'], protectedPortalRoute);
router.get('/event/date', viewEventsOnDate);
router.patch('/attendance', validateAttendence, checkUserBooking, signAttendance);

router.all(['/users', '/event/:eventcode/users', '/event'], protectedRoute);
router.get('/users', getUsersData);
router.get('/event/:eventcode/users', getUsersEvent);
router.patch('/event', deleteEvent);
router.post('/event', validateEvent, createEvent);

router.get('/event/:eventcode', getEventDetails);

router.use(clientError);
router.use(serverError);

module.exports = router;
