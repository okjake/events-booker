const router = require('express').Router();

const { serverError, clientError } = require('../controller');

router.post('/checkUser', (req, res) => res.json(req.body));
router.use(clientError);
router.use(serverError);

module.exports = router;
