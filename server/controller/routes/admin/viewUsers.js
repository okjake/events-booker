const getUsersOfEvent = require('../../../database/queries/getUsersOfEvent');


const getUsersEvent = (req, res, next) => {
  const { eventcode } = req.params;
  getUsersOfEvent(eventcode)
    .then(({ rows }) => {
      if (rows.length) {
        res.json(rows);
      } else {
        const error = new Error();
        error.msg = 'There is no regestied users yet';
        error.status = 400;
        next(error);
      }
    })
    .catch(next);
};

module.exports = getUsersEvent;
