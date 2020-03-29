const connction = require('../config/connection');

module.exports = (eventId) => {
  const sql = {
    text: 'select user_code from user_event where event_id = $1',
    values: [eventId],
  };
  return connction.query(sql);
};
