const { getAllEvents } = require('../../../database/queries/events');

const getEvents = (req, res, next) => {
  getAllEvents()
    .then(({ rows }) => res.json(rows))
    .catch(next);
};

module.exports = getEvents;
