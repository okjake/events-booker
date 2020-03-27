const { object, number } = require('yup');

const validationCancelReg = (req, res, next) => {
  const schema = object().shape({
    mobile: number().positive().integer().required(),
    event_code: number().positive().integer().required(),
  });
  schema.validate({
    mobile: req.body.mobile,
    event_code: req.body.event_code,
  }, { abortEarly: false })
    .then(next)
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

module.exports = { validationCancelReg };
