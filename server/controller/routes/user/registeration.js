const yup = require('yup');
const nodemailer = require('nodemailer');

const ical = require('ical-generator');
const moment = require('moment');
const googleAuth = require('./google_auth');

const { checkUserExist } = require('../../../database/queries/users');
const { getEventDetails } = require('../../../database/queries/events');
const { getUsersCode } = require('../../../database/queries/users');
const { signUserAttend } = require('../../../database/queries/users');
const { alreadyBooked } = require('../../../database/queries/events');

const checkUser = async (req, res, next) => {
  const mobileRegExp = /^(05[69])(\d{7})$/;
  const schema = yup.object().shape({
    mobile: yup.string().matches(mobileRegExp).length(10),
    eventCode: yup.number().required().positive().integer().min(100).max(999),
  });

  try {
    const result = await schema.isValid(req.body);
    if (!result) {
      const err = new Error();
      err.msg = 'invalid inputs';
      err.status = 400;
      throw err;
    }
    const { rows } = await checkUserExist(req.body.mobile);
    if (rows.length === 0) {
      return res
        .status(301)
        .json({ msg: "user doesn't exist, please register" });
    }
    const [user] = rows;
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

const checkEventExist = async (req, res, next) => {
  try {
    const { rows } = await getEventDetails(req.body.eventCode);
    if (rows.length === 0) {
      const err = new Error();
      err.status = 400;
      err.msg = 'the event you are trying to book does not exist';
      throw err;
    } else {
      const [event] = rows;
      req.event = event;
      return next();
    }
  } catch (error) {
    return next(error);
  }
};

const checkAlreadyBooked = async (req, res, next) => {
  try {
    const { rows } = await alreadyBooked(req.user.id, req.event.id);
    if (rows.length === 0) next();
    else {
      const err = new Error();
      err.status = 400;
      err.msg = 'you have already booked this event';
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

const generateRandom = (prevCodes) => {
  const random = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  if (prevCodes.indexOf(random) === -1) return random;
  return generateRandom(prevCodes);
};

const generateCode = async (req, res, next) => {
  try {
    const { rows } = await getUsersCode(req.event.id);
    const codes = rows.map((event) => event.user_code);
    const randomCode = generateRandom(codes);
    req.user.userCode = randomCode;
    next();
  } catch (error) {
    next(error);
  }
};

const userWillAttend = async (req, res, next) => {
  try {
    await signUserAttend(req.user.id, req.event.id, req.user.userCode);
    next();
  } catch (error) {
    next(error);
  }
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

  const EMAIL_USERNAME = process.env.EMAIL_ADMIN;
  const COMMON_NAME = 'Gaza Sky Geeks';
  const nodemailerSettings = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: process.env.EMAIL_SERVICE,
    from: `"${COMMON_NAME}" <${EMAIL_USERNAME}>`,
    auth: {
      type: 'OAuth2',
      user: EMAIL_USERNAME,
      clientId: googleAuth.credentials.web.client_id,
      clientSecret: googleAuth.credentials.web.client_secret,
      refreshToken: googleAuth.tokens.refresh_token,
      accessToken: googleAuth.tokens.access_token,
      expires: googleAuth.tokens.expiry_date,
    },
  };

  const transporter = nodemailer.createTransport(nodemailerSettings);

  const options = {
    from: `"Gaza Sky Geeks" <${process.env.EMAIL_ADMIN}>`,
    to: req.user.email,
    subject: `Invitation to ${req.event.title}`,
    html: `<h4 style="text-align : left">Dear ${req.user.first_name} ${req.user.last_name}</h4>
           <p style="text-align : left; margin-bottom:0px;">We would love to see you among us at ${req.event.title} in Gaza Sky Geeks so, add this event to your calendar to be remembered 
           </p> 
           <p style="text-align : left; margin-top:0px;">You will need this code to confirm attendance : <b>${req.user.userCode}</b></p>
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
  checkAlreadyBooked,
  generateCode,
  userWillAttend,
  sendInvitation,
};
