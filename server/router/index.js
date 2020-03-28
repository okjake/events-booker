const router = require('express').Router();

const {
  serverError, clientError, checkUser, checkEventExist, generateCode,
} = require('../controller');

router.post('/checkUser', checkUser, checkEventExist, generateCode);
router.use(clientError);
router.use(serverError);

module.exports = router;
