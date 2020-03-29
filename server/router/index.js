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
  checkAlreadBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
  cancelRegistration,
  getEvents,
} = require('../controller');

const { validationCancelReg } = require('../middleware');

router.post('/register', registerValidation, newUserExist, generateCode, addUserToDB, sendSms);
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

router.use(clientError);
router.use(serverError);

module.exports = router;
