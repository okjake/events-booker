const { getEventDetails } = require('../../../database/queries/events/index');

const getEventByCode = async (req, res, next) => {
  try {
    const { eventCode } = req.params;
    const { rows } = await getEventDetails(eventCode);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = getEventByCode;
