const { getUsersOfEvent } = require('../../../database/queries/users');

const getEventUsers = async (req, res, next) => {
  try {
    const { eventCode } = req.params;
    const { rows } = await getUsersOfEvent(eventCode);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = getEventUsers;
