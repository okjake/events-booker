const router = require('express').Router();

const {
  serverError,
  clientError,
  checkUser,
  checkEventExist,
  checkAlreadBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
  cancelRegistration,
  getEvents,
  validateEvent,
  checkUserBooking,
  signAttendance,
} = require('../controller');

const { validationCancelReg } = require('../middleware');

router.get('/getevents', getEvents);

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
router.patch('/attendance', validateEvent, checkUserBooking, signAttendance);

router.use(clientError);
router.use(serverError);

module.exports = router;
