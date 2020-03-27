const yup = require('yup');

const getUser = require('../../../database/query/users/getUser');
const newUser = require('../../../database/query/users/newUser');

const registerValidation = (req, res, next) => {
  const schema = yup.object().shape({
    firstName: yup.string().required().max(10),
    lastName: yup.string().required().max(10),
    email: yup.string().email(),
    mobile: yup.number().positive().integer().required(),
    location: yup.string().required(),

  });

  schema.validate({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobile: req.body.mobile,
    location: req.body.location,

  }, { abortEarly: false }).then(() => {
    // console.log('valid:', valid);
    // res.send('Good');
    next();
  }).catch((err) => {
    res.status(400).json({ message: err.message });
  });
};

const newUserExist = (req, res, next) => {
  getUser(req.body.email).then(({ rows }) => {
    if (rows.length === 0) next();
    else {
      const error = new Error();
      error.msg = 'Email Already Exists!';
      error.status = 400;
      next(error);
    }
  }).catch(next);
};

const addUserToDB = (req, res, next) => {
  newUser(req.body).then(() => res.json({ msg: 'Registerd successfuly' })).catch(next);
};


module.exports = { registerValidation, newUserExist, addUserToDB };
