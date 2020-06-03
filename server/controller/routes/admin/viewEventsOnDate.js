const moment = require('moment');

const { getEventsDate } = require('../../../database/queries/events');

const today = moment().format('YYYY-MM-DD');

const viewEventsOnDate = async (req, res, next) => {
  try {
    const { rows } = await getEventsDate();
    if (!rows.length) {
      return res.json({ events: 'no events available at GSG' });
    }
    const events = rows.filter(
      (el) => moment(el.date).format('YYYY-MM-DD') === today
    );
    return res.json(events);
  } catch (err) {
    return next(err);
  }
};

module.exports = viewEventsOnDate;
