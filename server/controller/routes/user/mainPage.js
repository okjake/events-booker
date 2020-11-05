const { getAllEvents } = require('../../../database/queries/events');

const getEvents = async (req, res, next) => {
  try {
    const { rows } = await getAllEvents();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = getEvents;
