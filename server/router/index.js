const router = require('express').Router();

const {
  serverError, clientError, checkUser, checkEventExist,
} = require('../controller');

router.post('/checkUser', checkUser, checkEventExist);
router.use(clientError);
router.use(serverError);

module.exports = router;
