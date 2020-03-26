const router = require('express').Router();

const { clientError, serverError } = require('../controller');

router.use(clientError);
router.use(serverError);

module.exports = router;
