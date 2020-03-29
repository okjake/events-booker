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
  login,
} = require('../controller');

const {
  validationCancelReg, loginValidation, checkEmailIfExist, checkPassword, protectedRoute,
} = require('../middleware');

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
router.post('/login', loginValidation, checkEmailIfExist, checkPassword, login);
router.get('/admin/dashboard', protectedRoute, (req, res) => {
  res.json('dashbord page');
});

router.use(clientError);
router.use(serverError);

module.exports = router;
