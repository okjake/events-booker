const router = require("express").Router();

const { serverError, clientError } = require("../controller");
const { getEvents } = require("../controller");

router.get("/getevents", getEvents);

router.use(clientError);
router.use(serverError);

module.exports = router;
