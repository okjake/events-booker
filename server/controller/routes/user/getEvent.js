const { getEventDetails } = require('../../../database/queries/events/index');

const getEventByCode = (req, res, next) => {
  const { eventcode } = req.params;
  getEventDetails(eventcode)
    .then(({ rows }) => res.json(rows[0]))
    .catch(next);
};

module.exports = getEventByCode;
