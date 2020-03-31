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
  deleteEvent,
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
router.patch('/attendance', protectedPortalRoute, validateAttendence, checkUserBooking, signAttendance);
router.get('/event/date', protectedPortalRoute, viewEventsOnDate);

// should be protected
router.use(protectedRoute);
// display event with specific  date
router.post('/event', validateEvent, createEvent);
router.get('/users', getUsersData);
router.get('/event/:eventcode/users', getUsersEvent);
router.patch('/deleteevent', deleteEvent);
router.get('/logout', logout);


router.use(clientError);
router.use(serverError);

module.exports = router;
