require('env2')('./config.env');

const Nexmo = require('nexmo');

const nexmo = new Nexmo(
  {
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
  },
  { debug: true },
);

const sendSms = (req, res, next) => {
  const { mobile } = req.body;
  const { userCode } = req.user;
  const text = `This is the attendance code: ${userCode}`;
  nexmo.message.sendSms(
    'GSG',
    mobile,
    text,
    { type: 'unicode' },
    (err) => {
      if (err) {
        const error = new Error();
        error.msg = 'Invalid Number!';
        error.status = 400;
        next(error);
      } else {
        next();
      }
    },
  );
};

module.exports = { sendSms };
