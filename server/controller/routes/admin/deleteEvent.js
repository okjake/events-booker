const { expiredEvent } = require('../../../database/queries/events');

const deleteEvent = (req, res, next) => {
  expiredEvent(req.body.id)
    .then((data) => res.json({ msg: 'The event has delete successfully', data }))
    .catch((err) => {
      const { status } = err;
      if (status === 400) {
        res.json(err);
      } else {
        next(err);
      }
    });
};

module.exports = deleteEvent;
