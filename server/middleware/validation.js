const { object, number, string } = require('yup');

const validationCancelReg = async (req, res, next) => {
  const schema = object().shape({
    mobile: number().positive().integer().required(),
    eventCode: number().positive().integer().required(),
  });
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ msg: 'Invalid Inputs!' });
    } else {
      next(error);
    }
  }
};

const loginValidation = async (req, res, next) => {
  const schema = object().shape({
    email: string().email().required(),
    password: string().min(8).required(),
  });
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ msg: error.errors[0] });
    } else {
      next(error);
    }
  }
};
module.exports = { validationCancelReg, loginValidation };
