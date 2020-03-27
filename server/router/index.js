const router = require('express').Router();

const {
  serverError,
  clientError,
  registerValidation,
  newUserExist,
  addUserToDB,
} = require('../controller');

router.post('/register', registerValidation, newUserExist, addUserToDB);
router.use(clientError);
router.use(serverError);

module.exports = router;
