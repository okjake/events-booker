const yup = require('yup');

const getAdmin = require('../../../database/queries/getAdmin');

const pinCodeValidation = (req, res, next) => {
  const schema = yup.object().shape({
    piCode: yup.number().positive().integer().required(),
  });
  schema.validate(req.body, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({ msg: err.message });
    });
};

const getHashedPinCode = (req, res, next) => {
  getAdmin().then(({ rows }) => {
    const [admin] = rows;
    req.admin.pinCode = admin.pinCode;
    next();
  });
};

module.exports = { pinCodeValidation, getHashedPinCode };
