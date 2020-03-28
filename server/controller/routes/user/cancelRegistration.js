const { cancelPopUp } = require('../../../database/queries/cancelRegistratinQ');

const cancelRegistration = (req, res, next) => {
  const id = req.eventUserId;
  cancelPopUp(id).then(({ rows }) => {
    if (rows.length) {
      res.json('your registration is cancelled');
    } else {
      const error = new Error();
      error.msg = 'erorr on delete prosess';
      error.status = 400;
      next(error);
    }
  })
    .catch(next);
};

module.exports = cancelRegistration;
