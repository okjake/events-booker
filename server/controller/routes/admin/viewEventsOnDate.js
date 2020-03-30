const moment = require('moment');
const { getEventsDate } = require('../../../database/queries/getEventsWithDate');

const today = moment();
today.format('YYYY-MM-DD');
const viewEventsOnDate = (req, res, next) => {
  getEventsDate().then(({ rows }) => {
    if (rows.length !== 0) {
      const events = rows.filter((el) => el.date.slice(0, 10) === today);
      res.json(events);
    } else {
      res.json('no events on this day');
    }
  }).catch(next);
};

module.exports = { viewEventsOnDate };
