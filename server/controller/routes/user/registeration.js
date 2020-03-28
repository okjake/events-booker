const yup = require('yup');

const checkUserExist = require('../../../database/queries/checkUserExist');
const getEventId = require('../../../database/queries/getEventId');
const getUsersCode = require('../../../database/queries/getUsersCode');
const signUserAttend = require('../../../database/queries/signUserAttend');
const alreadyBooked = require('../../../database/queries/checkAlreadyBooked');

const checkUser = (req, res, next) => {
  const mobileRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const schema = yup.object().shape({
    mobileNum: yup.string().matches(mobileRegExp),
    eventCode: yup
      .number()
      .required()
      .positive()
      .integer()
      .min(100)
      .max(999),
  });
  const result = schema.isValidSync(req.body);
  if (!result) {
    const err = new Error();
    err.msg = 'invalid inputs';
    err.status = 400;
    return next(err);
  }

  checkUserExist(req.body.mobileNum)
    .then(({ rows }) => {
      if (rows.length === 0) {
        const err = new Error();
        err.status = 401;
        err.msg = 'user doesn\'t exist, please register';
        next(err);
      } else {
        const [user] = rows;
        req.user = user;
        next();
      }
    })
    .catch(next);
};

const checkEventExist = (req, res, next) => {
  getEventId(req.body.eventCode).then(({ rows }) => {
    if (rows.length === 0) {
      const err = new Error();
      err.status = 404;
      err.msg = 'the event you are trying to book does not exist';
      next(err);
    } else {
      const [{ id }] = rows;
      req.user.eventId = id;
      next();
    }
  });
};

const checkAlreadBooked = (req, res, next) => {
  alreadyBooked(req.user).then(({ rows }) => {
    if (rows.length === 0) next();
    else {
      const err = new Error();
      err.status = 400;
      err.msg = 'you have already booked this event';
      next(err);
    }
  }).catch(next);
};

const generateRandom = (prevCodes) => {
  const random = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  if (prevCodes.indexOf(random) === -1) return random;
  return generateRandom(prevCodes);
};

const generateCode = (req, res, next) => {
  getUsersCode(req.user.eventId).then(({ rows }) => {
    const codes = rows.map((event) => event.user_code);
    const randomCode = generateRandom(codes);
    req.user.userCode = randomCode;
    next();
  }).catch(next);
};

const userWillAttend = (req, res, next) => {
  signUserAttend(req.user).then(() => {
    res.json({ msg: 'all good' });
  }).catch(next);
};

module.exports = {
  checkUser, checkEventExist, checkAlreadBooked, generateCode, userWillAttend,
};
