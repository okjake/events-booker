const connection = require('../../config/connection');

const getEventDetails = (eventCode) => {
  const sql = {
    text:
      'SELECT  events.id, events.title, events.category, events.event_code, events.details, events.image, events.date, events.duration, COUNT(user_event.event_id) AS Count FROM events LEFT JOIN user_event ON (user_event.event_id = events.id) WHERE events.event_code = $1 GROUP BY  events.id',
    values: [eventCode],
  };
  return connection.query(sql);
};

module.exports = getEventDetails;
