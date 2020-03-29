require('env2')('./config.env');

const Nexmo = require('nexmo');
// Init Nexmo
const nexmo = new Nexmo(
  {
    apiKey: '6bce011d',
    apiSecret: 'C0RAsVGz6UvFWs9N',
  },
  { debug: true },
);

const sendSms = (req, res, next) => {
  const { mobile, userCode } = req.body;
  const text = `Hi, Your validation code is  ${userCode}`;
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
        const data = {
          id: responseData.messages[0]['message-id'],
          number: responseData.messages[0].to,
        };
        res.json({
          msg: `Message sent successfuly to ${data.number}`,
        });
      }
    },
  );
};

module.exports = { sendSms };
