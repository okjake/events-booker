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
  getUsersEvent,
  getUsersData,
  validateEvent,
  createEvent,
  validateAttendence,
  checkUserBooking,
  signAttendance,
  deleteEvent,
} = require('../controller');

const {
  validationCancelReg, loginValidation, checkEmailIfExist, checkPassword, protectedRoute,
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


// should be protected
router.use(protectedRoute);
router.post('/event', validateEvent, createEvent);
router.patch('/attendance', validateAttendence, checkUserBooking, signAttendance);
router.get('/users', getUsersData);
router.get('/event/:eventcode/users', getUsersEvent);
router.patch('/deleteevent', deleteEvent);

router.use(clientError);
router.use(serverError);

module.exports = router;
