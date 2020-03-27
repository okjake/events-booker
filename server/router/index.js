const router = require('express').Router();

const { serverError, clientError, checkUser } = require('../controller');

router.post('/checkUser', checkUser);
router.use(clientError);
router.use(serverError);

module.exports = router;
