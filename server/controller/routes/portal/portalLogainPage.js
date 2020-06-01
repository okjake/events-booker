const yup = require('yup');
const jwt = require('jsonwebtoken');

const getAdmin = require('../../../database/queries/getAdmin');

const pinCodeValidation = async (req, res, next) => {
  const schema = yup.object().shape({
    pinCode: yup.string().required(),
  });
  try {
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }
    return next(err);
  }
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
  res.json({ msg: 'Logged in successfully' });
};

module.exports = { pinCodeValidation, getHashedPinCode, createPortalToken };
