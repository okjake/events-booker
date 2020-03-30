const { getEventsDate } = require('../../../database/queries/getEventsWithDate');

const viewEventsOnDate = (req, res, next) => {
  getEventsDate().then(({ rows }) => {
    if (rows.length !== 0) {
      res.json(rows);
    } else {
      res.json('no events on this day');
    }
  }).catch(next);
};

module.exports = { viewEventsOnDate };
