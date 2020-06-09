const yup = require('yup');

const { getUser } = require('../../../database/queries/users');
const { newUser } = require('../../../database/queries/users');
const { checkUserExist } = require('../../../database/queries/users');

const mobileRegExp = /^(05[69])(\d{7})$/;

const schema = yup.object().shape({
  firstName: yup.string().required().max(10),
  lastName: yup.string().required().max(10),
  email: yup.string().email().required().max(50),
  mobile: yup.string().required().length(10).matches(mobileRegExp),
  location: yup.string().required().max(50),
});

const signUpUser = async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    const { rows } = await getUser(req.body.email);
    if (rows.length !== 0)
      return res.status(400).json({ msg: 'email is already taken!' });
    const { rows: currentUser } = await checkUserExist(req.body.mobile);
    if (currentUser.length !== 0)
      return res.status(400).json({ msg: 'mobile number is already taken!' });
    await newUser(req.body);
    return res.sendStatus(201);
  } catch (err) {
    if (err.name === 'ValidationError') {
      if (err.errors[0].includes('mobile must match the following'))
        return res.status(400).json({ msg: 'invalid mobile number' });
      return res.status(400).json({ msg: err.errors[0] });
    }
    return next(err);
  }
};

module.exports = signUpUser;
