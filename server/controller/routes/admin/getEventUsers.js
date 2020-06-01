const { getUsersOfEvent } = require('../../../database/queries/users');

const getEventUsers = (req, res, next) => {
  const { eventCode } = req.params;
  getUsersOfEvent(eventCode)
    .then(({ rows }) => {
      if (rows) {
        res.json(rows);
      }
    })
    .catch(next);
};

module.exports = getEventUsers;
