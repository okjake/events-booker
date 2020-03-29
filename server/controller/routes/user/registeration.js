const yup = require('yup');

const getUser = require('../../../database/queries/users/getUser');
const newUser = require('../../../database/queries/users/newUser');

// Validate the user data
const registerValidation = (req, res, next) => {
  console.log('req.body is :', req.body);
  console.log('req.params is :', req.params);


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

const generatCode = (req, res, next) => {
  const userCode = '123';
  req.body.userCode = userCode;
  next();
};

// insert the valid user to the database
const addUserToDB = (req, res, next) => {
  newUser(req.body).then(() => {
    console.log('the data from the database query', req.body);

    res.send('good')
  }).catch(next);
};

module.exports = {
  registerValidation,
  newUserExist,
  addUserToDB,
  generatCode,
};
