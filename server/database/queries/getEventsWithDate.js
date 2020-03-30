const connection = require('../config/connection');

const getEventsDate = () => connection.query('SELECT * FROM events WHERE expired=False AND date=CURRENT_DATE');

module.exports = { getEventsDate };
