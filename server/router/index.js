const router = require('express').Router();

const { serverError, clientError } = require('../controller');


router.use(clientError);
router.use(serverError);

module.exports = router;
