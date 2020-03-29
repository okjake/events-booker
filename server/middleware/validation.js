const { object, number, string } = require('yup');

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

const loginValidation = (req, res, next) => {
  const schema = object().shape({
    email: string().email().required(),
    password: number().positive().integer().required(),
  });
  const { email, password } = req.body;
  schema.validate({
    email,
    password,
  }, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

module.exports = { validationCancelReg, loginValidation };
