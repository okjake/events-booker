const { getEventDetails } = require('../../../database/queries/events/index');

const getEventByCode = async (req, res, next) => {
  try {
    const { eventcode } = req.params;
    const { rows } = await getEventDetails(eventcode);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = getEventByCode;
