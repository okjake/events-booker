const yup = require('yup');

const getUser = require('../../../database/queries/users/getUser');
const newUser = require('../../../database/queries/users/newUser');

// Validate the user data
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
    location: req.body.location,
    mobile: req.body.mobile,
    eventCode: req.body.eventCode,

  }, { abortEarly: false }).then(() => {
    next();
  }).catch((err) => {
    res.status(400).json({ message: err.message });
  });
};

// Check if the user use exist email
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

// insert the valid user to the database
const addUserToDB = (req, res, next) => {
  newUser(req.body).then(() => {
    next();
  }).catch(next);
};

module.exports = {
  registerValidation,
  newUserExist,
  addUserToDB,
};
