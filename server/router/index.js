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
  getUsersEvent,
} = require('../controller');

const { validationCancelReg } = require('../middleware');

router.get('/getevents', getEvents);

router.get('/event/:eventcode/users', getUsersEvent);

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

router.use(clientError);
router.use(serverError);

module.exports = router;
