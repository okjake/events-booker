const router = require('express').Router();

const {
  serverError, clientError, checkUser, checkEventExist, generateCode, userWillAttend,
} = require('../controller');

router.post('/checkUser', checkUser, checkEventExist, generateCode, userWillAttend);
router.use(clientError);
router.use(serverError);

module.exports = router;
