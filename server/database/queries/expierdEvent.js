const connction = require('../config/connection');

module.exports = (eventId) => connction.query('update events set expired = true where id = $1', [eventId]);
