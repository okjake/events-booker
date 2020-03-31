const moment = require('moment');

const { getEventsDate } = require('../../../database/queries/events');

const today = moment().format('YYYY-MM-DD');
const viewEventsOnDate = (req, res, next) => {
  getEventsDate().then(({ rows }) => {
    if (rows.length !== 0) {
      const events = rows.filter((el) => moment(el.date).format('YYYY-MM-DD') === today);
      res.json(events);
    } else {
      res.json({ events: 'no events on this day' });
    }
  }).catch(next);
};

module.exports = viewEventsOnDate;
