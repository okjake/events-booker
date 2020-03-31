const connction = require('../config/connection');

const expiredEvent = (eventId) => connction.query('update events set expired = true where id = $1', [eventId]);

module.exports = expiredEvent;
