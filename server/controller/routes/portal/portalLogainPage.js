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
    console.log(5555, err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }
    return next(err);
  }
};

const getHashedPinCode = async (req, res, next) => {
  try {
    const { rows } = await getAdmin();
    const [admin] = rows;
    req.pinCode = admin.pin_code;
    req.adminId = admin.id;
    next();
  } catch (err) {
    next(err);
  }
};

const createPortalToken = (req, res, next) => {
  const token = jwt.sign({ id: req.adminId }, process.env.SECRET_KEY_PORTAL);
  res.cookie('portalToken', token);
  res.json({ msg: 'Logged in successfully' });
};

module.exports = { pinCodeValidation, getHashedPinCode, createPortalToken };
