const deleteEventQuery = require('../../../database/queries/events');

const deleteEvent = (req, res, next) => {
  deleteEventQuery(req.body.id)
    .then(() => res.json({ msg: 'The event has delete successfully' }))
    .catch(next);
};

module.exports = deleteEvent;
