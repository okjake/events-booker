const yup = require('yup');
const nodemailer = require('nodemailer');
const ical = require('ical-generator');
const moment = require('moment');

const { checkUserExist } = require('../../../database/queries/users');
const { getEventDetails } = require('../../../database/queries/events');
const { getUsersCode } = require('../../../database/queries/users');
const { signUserAttend } = require('../../../database/queries/users');
const { alreadyBooked } = require('../../../database/queries/events');

const checkUser = (req, res, next) => {
  const mobileRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const schema = yup.object().shape({
    mobile: yup.string().matches(mobileRegExp),
    eventCode: yup.number().required().positive().integer().min(100).max(999),
  });
  const result = schema.isValidSync(req.body);
  if (!result) {
    const err = new Error();
    err.msg = 'invalid inputs';
    err.status = 400;
    res.status(400).json(err);
    throw err;
  }

  return checkUserExist(req.body.mobile)
    .then(({ rows }) => {
      if (rows.length === 0) {
        res.status(301).json({ msg: "user doesn't exist, please register" });
      } else {
        const [user] = rows;
        req.user = user;
        next();
      }
    })
    .catch(next);
};

const checkEventExist = (req, res, next) => {
  getEventDetails(req.body.eventCode).then(({ rows }) => {
    if (rows.length === 0) {
      const err = new Error();
      err.status = 400;
      err.msg = 'the event you are trying to book does not exist';
      next(err);
    } else {
      const [event] = rows;
      req.event = event;
      next();
    }
  });
};

const checkAlreadBooked = (req, res, next) => {
  alreadyBooked(req.user.id, req.event.id)
    .then(({ rows }) => {
      if (rows.length === 0) next();
      else {
        const err = new Error();
        err.status = 400;
        err.msg = 'you have already booked this event';
        throw err;
      }
    })
    .catch((err) => {
      next(err);
    });
};

const generateRandom = (prevCodes) => {
  const random = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  if (prevCodes.indexOf(random) === -1) return random;
  return generateRandom(prevCodes);
};

const generateCode = (req, res, next) => {
  getUsersCode(req.event.id)
    .then(({ rows }) => {
      const codes = rows.map((event) => event.user_code);
      const randomCode = generateRandom(codes);
      req.user.userCode = randomCode;
      next();
    })
    .catch(next);
};

const userWillAttend = (req, res, next) => {
  signUserAttend(req.user.id, req.event.id, req.user.userCode)
    .then(() => {
      next();
    })
    .catch(next);
};

const sendInvitation = (req, res, next) => {
  const cal = ical({
    events: [
      {
        start: moment(new Date(req.event.date)),
        end: moment(new Date(req.event.date))
          .add(req.event.duration, 'm')
          .toDate(),
        summary: `Invitation to ${req.event.title}`,
        organizer: {
          name: 'Gaza Sky Geeks',
          email: process.env.EMAIL_ADMIN,
        },
      },
    ],
  }).toString();

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_ADMIN,
      pass: process.env.EMAIL_PASS,
    },
  });

  const options = {
    from: `"Gaza Sky Geeks" <${process.env.EMAIL_ADMIN}>`,
    to: req.user.email,
    subject: `Invitation to ${req.event.title}`,
    html: `<h4 style="text-align : left">Dear ${req.user.first_name} ${req.user.last_name}</h4>
           <p style="text-align : left; margin-bottom:0px;">We would love to see you among us at ${req.event.title} in Gaza Sky Geeks so, add this event to your calendar to be remembered 
           </p> 
           <p style="text-align : left; margin-top:0px;">You will need this code to confirm attendance : ${req.user.userCode}</p>
           <p style="text-align : left">Gaza Sky Geeks Team</p>
          `,
    icalEvent: {
      filename: 'invitation.ics',
      method: 'request',
      content:
        'BEGIN:VCALENDAR\r\nPRODID:-//ACME/DesktopCalendar//EN\r\nMETHOD:REQUEST\r\nVERSION:2.0\r\n...',
    },
    alternatives: [
      {
        contentType: 'text/calendar',
        content: Buffer.from(cal.toString()),
      },
    ],
  };

  transporter
    .sendMail(options)
    .then(() => next())
    .catch(next);
};

module.exports = {
  checkUser,
  checkEventExist,
  checkAlreadBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
};
