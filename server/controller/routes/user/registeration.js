const yup = require('yup');

const checkUserExist = require('../../../database/queries/checkUserExist');

const checkUser = (req, res, next) => {
  const mobileRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const schema = yup.object().shape({
    mobileNum: yup.string().matches(mobileRegExp),
    eventCode: yup
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

  checkUserExist(req.body.mobileNum)
    .then(({ rows }) => {
      if (rows.length === 0) {
        const err = new Error();
        err.status = 401;
        err.msg = 'user doesn\'t exist, please register';
        next(err);
      } else res.json(rows);
    })
    .catch(next);
};

module.exports = { checkUser };
