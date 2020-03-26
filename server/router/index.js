const router = require('express').Router();

const { clientError, serverError } = require('../controller');

//cancel user registration

router.use(clientError);
router.use(serverError);

module.exports = router;
