const router = require('express').Router();

const {
  serverError,
  clientError,
  registerValidation,
  newUserExist,
  generatCode,
  addUserToDB,
  sendSms,
} = require('../controller');

router.post('/register', registerValidation, newUserExist, generatCode, addUserToDB);
// router.post('/sendSms', sendSms);

router.use(clientError);
router.use(serverError);

module.exports = router;
