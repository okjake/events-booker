const yup = require('yup');

const checkUser = (req, res, next) => {
  const mobileRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const schema = yup.object().shape({
    mobile: yup.string().matches(mobileRegExp, 'Mobile number is not valid'),
    code: yup
      .number()
      .required()
      .positive()
      .integer()
      .min(100)
      .max(999),
  });
  const result = schema.isValidSync(req.body);
  if (!result) {
    const err = new Error();
    err.msg = 'invalid inputs';
    err.status = 400;
    return next(err);
  }
  res.json({ msg: 'all good' });
};

module.exports = { checkUser };
