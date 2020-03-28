const router = require('express').Router();

const {
  serverError,
  clientError,
  checkUser,
  checkEventExist,
  checkAlreadBooked,
  generateCode,
  userWillAttend,
} = require('../controller');

router.post(
  '/checkUser',
  checkUser,
  checkEventExist,
  checkAlreadBooked,
  generateCode,
  userWillAttend,
);
router.use(clientError);
router.use(serverError);

module.exports = router;
