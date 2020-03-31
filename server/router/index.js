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
  login,
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
  viewEventsOnDate,
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

router.get('/getevents', getEvents);
router.post('/register',
  registerValidation,
  newUserExist,
  addUserToDB,
  checkEventExist,
  generateCode,
  userWillAttend,
  sendSms,
  sendInvitation);

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
router.post('/cancelUser', validationCancelReg, cancelRegistration);
router.post('/login', loginValidation, checkEmailIfExist, checkPassword, login);


router.post('/portal/login', pinCodeValidation, getHashedPinCode, checkPinCode);
// pin code protection for portal route
router.use(protectedPortalRoute);
router.post('/event', validateEvent, createEvent);
router.patch('/attendance', validateAttendence, checkUserBooking, signAttendance);

// should be protected
router.use(protectedRoute);
// display event with specific  date
router.get('/event/date', viewEventsOnDate);
router.get('/users', getUsersData);
router.get('/event/:eventcode/users', getUsersEvent);
router.get('/logout', logout);


router.use(clientError);
router.use(serverError);

module.exports = router;
