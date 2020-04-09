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
    `97${mobile}`,
    text,
    { type: 'unicode' },
    (err, responseData) => {
      if (err) {
        const error = new Error();
        error.msg = 'Invalid Number!';
        error.status = 400;
        res.json(error);
      } else if (responseData.messages[0].status === '0') {
        res
          .json({
            msg:
          'Event has been booked successfully, you will receive an email with the details and a sms with the code',
            status: 201,
          });
      } else {
        res.json({ msg: `Registered successfully but the: ${responseData.messages[0]['error-text']}`, status: 201 });
      }
    },
  );
};

module.exports = sendSms;
