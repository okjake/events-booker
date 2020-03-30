const router = require('express').Router();

const {
  serverError,
  clientError,
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
// display event with specific  date
router.get('/event/:date', (req, res) => {
  res.json({ 'display event with date': req.params.date });
});
router.use(clientError);
router.use(serverError);

module.exports = router;
