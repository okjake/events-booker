const { getEventDetails } = require('../../../database/queries/events/index');

const getEventByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const {
      rows: [event],
    } = await getEventDetails(code);
    res.json(event);
  } catch (err) {
    next(err);
  }
};

module.exports = getEventByCode;
