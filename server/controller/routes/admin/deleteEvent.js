const { expiredEvent } = require('../../../database/queries/events');

const deleteEvent = (req, res, next) => {
  expiredEvent(req.body.id)
    .then((data) =>
      res.json({ msg: 'The event has deleted successfully', data })
    )
    .catch((err) => {
      next(err);
    });
};

module.exports = deleteEvent;
