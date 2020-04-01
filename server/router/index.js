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

router.get('/event', getEvents);
router.post(
  '/register',
  registerValidation,
  newUserExist,
  addUserToDB,
  checkEventExist,
  generateCode,
  userWillAttend,
  sendSms,
  sendInvitation,
);
router.post(
  '/checkUser',
  checkUser,
  checkEventExist,
  checkAlreadBooked,
  generateCode,
  userWillAttend,
  sendSms,
  sendInvitation,
);

router.post('/login', loginValidation, checkEmailIfExist, checkPassword);
router.get('/logout', logout);

router.post('/cancelUser', validationCancelReg, cancelRegistration);

router.post('/portal/login', pinCodeValidation, getHashedPinCode, checkPinCode, createPortalToken);
router.post('/portal/logout', pinCodeValidation, getHashedPinCode, checkPinCode, portalLogout);

router.use(['/event/date', '/attendance'], protectedPortalRoute);
router.get('/event/date', viewEventsOnDate);
router.patch('/attendance', validateAttendence, checkUserBooking, signAttendance);

router.use(['/event', '/users', '/event/:eventcode/users'], protectedRoute);
router.get('/users', getUsersData);
router.get('/event/:eventcode/users', getUsersEvent);
router.patch('/event', deleteEvent);
router.post('/event', validateEvent, createEvent);

router.use(clientError);
router.use(serverError);

module.exports = router;
