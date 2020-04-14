const { cancelPopUp } = require('../../../database/queries/users');

const cancelRegistration = (req, res, next) => {
  const data = req.body;
  cancelPopUp(data).then(({ rows }) => {
    if (rows.length) {
      res.json({ msg: 'your registration has been cancelled' });
    } else {
      const error = new Error();
      error.msg = 'This mobile did not register at this event';
      error.status = 400;
      throw error;
    }
  })
    .catch((error) => {
      if (error.status === 400) {
        res.status(400).json(error);
      } else {
        next(error);
      }
    });
};

module.exports = cancelRegistration;
