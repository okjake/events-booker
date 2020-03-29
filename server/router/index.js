const router = require("express").Router();

const {
  serverError,
  clientError,
  cancelRegistration
} = require("../controller");
const { validationCancelReg } = require("../middleware");
const { getEvents } = require("../controller");

//Get All the events
router.get("/getevents", getEvents);

// cancel user registration
router.post("/cancelUser", validationCancelReg, cancelRegistration);

router.use(clientError);
router.use(serverError);

module.exports = router;
