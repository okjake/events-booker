const cancelPopUp = require('../../../database/queries/users');

const cancelRegistration = (req, res, next) => {
  const data = req.body;
  cancelPopUp(data).then(({ rows }) => {
    if (rows.length) {
      res.json('your registration is cancelled');
    } else {
      const error = new Error();
      error.msg = 'mobile dosent register on this event';
      error.status = 400;
      next(error);
    }
  })
    .catch(next);
};

module.exports = cancelRegistration;
