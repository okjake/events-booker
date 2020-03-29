const router = require('express').Router();

const {
  serverError,
  clientError,
  registerValidation,
  newUserExist,
  addUserToDB,
  getUserID,
  sendSms,
  checkUser,
  checkEventExist,
  generateCode,
  userWillAttend,
  checkAlreadBooked,
  sendInvitation,
  cancelRegistration,
  getEvents,
  validateEvent,
  createEvent,
  validateAttendence,
  checkUserBooking,
  signAttendance,
} = require('../controller');

const { validationCancelReg } = require('../middleware');

router.get('/getevents', getEvents);
router.post('/register',
  registerValidation,
  newUserExist,
  addUserToDB,
  getUserID,
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
  sendInvitation,
);
router.post('/cancelUser', validationCancelReg, cancelRegistration);

// should be protected
router.post('/event', validateEvent, createEvent);
router.patch('/attendance', validateAttendence, checkUserBooking, signAttendance);

router.use(clientError);
router.use(serverError);

module.exports = router;
