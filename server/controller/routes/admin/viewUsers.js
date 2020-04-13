const { getUsersOfEvent } = require('../../../database/queries/users');


const getUsersEvent = (req, res, next) => {
  const { eventcode } = req.params;
  getUsersOfEvent(eventcode)
    .then(({ rows }) => {
      if (rows) {
        res.json(rows);
      }
    })
    .catch(next);
};

module.exports = getUsersEvent;
