const yup = require('yup');

const { getEventDetails } = require('../../../database/queries/events');
const { userHasBooked } = require('../../../database/queries/users');
const { signAttendanceSql } = require('../../../database/queries/admin');

const validateAttendance = async (req, res, next) => {
  const schema = yup.object().shape({
    userCode: yup.number().required().positive().integer().min(100).max(999),
    eventCode: yup.number().required().positive().integer().min(100).max(999),
  });
  try {
    await schema.validate(req.body);
    const { rows } = await getEventDetails(req.body.eventCode);
    if (rows.length) {
      req.eventId = rows[0].id;
      return next();
    }
    return res
      .status(400)
      .json({ msg: `event with code ${req.body.eventCode} doesn't exist` });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const e = new Error();
      e.msg = err.message;
      e.status = 400;
      return next(e);
    }
    return next(err);
  }
};

const checkUserBooking = async (req, res, next) => {
  const {
    body: { userCode },
    eventId,
  } = req;
  try {
    const { rows } = await userHasBooked(userCode, eventId);
    if (rows.length) {
      return next();
    }

    return res.status(400).json({
      msg:
        "user hasn't booked this event yet, please book the event then try again",
    });
  } catch (err) {
    return next(err);
  }
};

const signAttendance = async (req, res, next) => {
  const {
    body: { userCode },
    eventId,
  } = req;
  try {
    await signAttendanceSql(userCode, eventId);
    return res.json({ msg: 'thanks for attending' });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  validateAttendance,
  checkUserBooking,
  signAttendance,
};
