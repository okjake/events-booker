const connection = require('../../config/connection');

const getEventsDate = () =>
  connection.query('SELECT * FROM events WHERE expired=False');

module.exports = getEventsDate;
