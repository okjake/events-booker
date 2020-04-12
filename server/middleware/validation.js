const { object, number, string } = require('yup');

const validationCancelReg = (req, res, next) => {
  const schema = object().shape({
    mobile: number()
      .positive()
      .integer()
      .required(),
    eventCode: number()
      .positive()
      .integer()
      .required(),
  });
  schema
    .validate(req.body, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.json({ msg: err.message });
    });
};

const loginValidation = (req, res, next) => {
  const schema = object().shape({
    email: string()
      .email()
      .required(),
    password: string()
      .min(8)
      .required(),
  });
  schema
    .validate(req.body, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.json({ msg: err.message });
    });
};

module.exports = { validationCancelReg, loginValidation };
