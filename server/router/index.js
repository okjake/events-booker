const router = require('express').Router();

const { serverError, clientError } = require('../controller');


//cancel user registration

router.use(clientError);
router.use(serverError);

module.exports = router;
