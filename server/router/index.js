const router = require('express').Router();

const { serverError, clientError, cancelRegistration } = require('../controller');
const { validationCancelReg } = require('../middleware');


// cancel user registration
router.post('/cancelUser', validationCancelReg, cancelRegistration);

router.use(clientError);
router.use(serverError);

module.exports = router;
