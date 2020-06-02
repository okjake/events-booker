const { cancelPopUp } = require('../../../database/queries/users');

const cancelRegistration = async (req, res, next) => {
  const data = req.body;
  try {
    const { rows } = await cancelPopUp(data);
    if (rows.length) {
      res.json({ msg: 'your registration has been cancelled' });
    } else {
      const error = new Error();
      error.msg = 'This mobile did not register at this event';
      error.status = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = cancelRegistration;
