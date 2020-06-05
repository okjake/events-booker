const { expiredEvent } = require('../../../database/queries/events');

const deleteEvent = async (req, res, next) => {
  try {
    const data = await expiredEvent(req.body.id);
    res.json({ sg: 'The event has deleted successfully', data });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteEvent;
