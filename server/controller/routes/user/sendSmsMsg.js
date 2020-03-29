require('env2')('./config.env');

const Nexmo = require('nexmo');
// Init Nexmo
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
  const text = ` thanks for your registration, this your confirmation attendance code :  ${userCode}`;
  nexmo.message.sendSms(
    'GSG',
    mobile,
    text,
    { type: 'unicode' },
    (err, responseData) => {
      if (err) {
        const error = new Error();
        error.msg = 'Invalid Number!';
        error.status = 400;
        next(error);
      } else {
        console.dir(responseData);
        const data = {
          id: responseData.messages[0]['message-id'],
          number: responseData.messages[0].to,
        };
        // I've added the user number to the user to print the user message
        // your validation code send to "user number"
        req.user.number = data.number;
        next();
      }
    },
  );
};

module.exports = { sendSms };
