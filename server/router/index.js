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
} = require('../controller');

router.post(
  '/checkUser',
  checkUser,
  checkEventExist,
  checkAlreadBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
);
router.use(clientError);
router.use(serverError);

module.exports = router;
