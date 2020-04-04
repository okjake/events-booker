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
      res.status(400).json({ msg: err.message });
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
<<<<<<< HEAD
  const token = jwt.sign({ id: req.adminId }, process.env.SECRET_KEY_PORTAL);
  res.cookie('portalToken', token);
||||||| merged common ancestors
  const token = jwt.sign({ id: req.admin.id }, process.env.SECRET_KEY_PORTAL);
  res.cookie('portalToken', token);
=======
  const token = jwt.sign({ id: req.adminId }, process.env.SECRET_KEY_PORTAL);
>>>>>>> 0358b25d9af7b27cfcecfe4f669bff13ec4640e6
  res.json({ msg: 'You are authorized' });
};

module.exports = { pinCodeValidation, getHashedPinCode, createPortalToken };
