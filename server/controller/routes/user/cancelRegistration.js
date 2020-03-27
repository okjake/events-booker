const { cancelPopUp } = require('../../../database/queries/cancelRegistratinQ');

const cancelRegistration = (req, res, next) => {
  const id = req.eventUserId;
  cancelPopUp(id).then((result) => {
    if (result.rows.length) {
      res.json('deleted!!');
    } else {
      const error = new Error();
      error.msg = 'erorr on delete register';
      error.status = 400;
      next(error);
    }
  })
    .catch(next);
};

module.exports = cancelRegistration;
