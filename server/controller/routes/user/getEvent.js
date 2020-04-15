const { getEventDetails } = require('../../../database/queries/events/index');

const getEventByCode = (req, res, next) => {
  const { eventCode } = req.body;
  getEventDetails(eventCode)
    .then(({ rows }) => res.json(rows[0]))
    .catch(next);
};

module.exports = getEventByCode;
