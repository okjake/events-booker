const { expiredEvent } = require('../../../database/queries/events');

const deleteEvent = (req, res, next) => {
  expiredEvent(req.body.id)
    .then(() => res.json({ msg: 'The event has delete successfully' }))
    .catch((err) => {
      console.log(err);

      res.json(err);
    });
};

module.exports = deleteEvent;
