const { object, number, string } = require('yup');

const validationCancelReg = (req, res, next) => {
  const schema = object().shape({
    mobile: number().positive().integer().required(),
    eventCode: number().positive().integer().required(),
  });
  schema
    .validate(req.body, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({ msg: 'Invalid Inputs!' });
    });
};

const loginValidation = (req, res, next) => {
  const schema = object().shape({
    email: string().email().required(),
    password: string().min(8).required(),
  });
  schema
    .validate(req.body, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({ msg: 'Invalid Inputs!' });
    });
};

module.exports = { validationCancelReg, loginValidation };
