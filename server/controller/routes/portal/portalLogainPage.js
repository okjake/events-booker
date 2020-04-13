const yup = require('yup');
const jwt = require('jsonwebtoken');

const getAdmin = require('../../../database/queries/getAdmin');

const pinCodeValidation = (req, res, next) => {
  const schema = yup.object().shape({
    pinCode: yup.string().required(),
  });
  schema.validate(req.body, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.json({ msg: 'Invalid Inputs!', status: 400 });
    });
};

const getHashedPinCode = (req, res, next) => {
  getAdmin().then(({ rows }) => {
    const [admin] = rows;
    req.pinCode = admin.pin_code;
    req.adminId = admin.id;
    next();
  });
};

const createPortalToken = (req, res, next) => {
  const token = jwt.sign({ id: req.adminId }, process.env.SECRET_KEY_PORTAL);
  res.cookie('portalToken', token);
  res.json({ msg: 'Portal, logged in successfully', status: 301 });
};

module.exports = { pinCodeValidation, getHashedPinCode, createPortalToken };
