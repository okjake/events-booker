const yup = require('yup');

const { getEventDetails } = require('../../../database/queries/events');
const { userHasBooked } = require('../../../database/queries/users');
const { signAttendanceSql } = require('../../../database/queries/admin');

const validateAttendence = (req, res, next) => {
  const schema = yup.object().shape({
    userCode: yup.number().required().positive().integer().min(100).max(999),
    eventCode: yup.number().required().positive().integer().min(100).max(999),
  });

  const result = schema.isValidSync(req.body);
  if (!result) {
    const err = new Error();
    err.msg = 'invalid inputs';
    err.status = 400;
    return next(err);
  }
  return getEventDetails(req.body.eventCode)
    .then(({ rows }) => {
      if (rows.length) {
        req.eventId = rows[0].id;
        next();
      } else {
        res.status(400).json({
          msg: `event with code ${req.body.eventCode} doesn't exist`,
        });
      }
    })
    .catch(next);
};

const checkUserBooking = (req, res, next) => {
  userHasBooked(req.body.userCode, req.eventId)
    .then(({ rows }) => {
      if (rows.length) next();
      else {
        res.status(400).json({
          msg:
            "user hasn't booked this event yet, please book the event then try again",
        });
      }
    })
    .catch(next);
};

const signAttendance = (req, res, next) => {
  signAttendanceSql(req.body.userCode, req.eventId)
    .then(() => res.json({ msg: 'thanks for attending' }))
    .catch(next);
};

module.exports = {
  validateAttendence,
  checkUserBooking,
  signAttendance,
};
