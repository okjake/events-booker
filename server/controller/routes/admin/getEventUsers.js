const yup = require('yup');

const { getUsersOfEvent } = require('../../../database/queries/users');

const schema = yup.object().shape({
  eventCode: yup.number().required().positive().integer().min(100).max(999),
});
const getEventUsers = async (req, res, next) => {
  try {
    const { eventCode } = req.params;
    await schema.validate({ eventCode });
    const { rows } = await getUsersOfEvent(eventCode);
    return res.json(rows);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res
        .status(400)
        .json({ msg: 'event code must be a number of 3 digits' });
    }
    return next(err);
  }
};

module.exports = getEventUsers;
