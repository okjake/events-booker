const { object, number } = require('yup');

const validationCancelReg = (req, res, next) => {
  const schema = object().shape({
    mobile: number().positive().integer().required(),
    event_code: number().positive().integer().required(),
  });
  const { mobile, eventCode } = req.body;
  schema.validate({
    mobile,
    event_code: eventCode,
  }, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

module.exports = { validationCancelReg };
