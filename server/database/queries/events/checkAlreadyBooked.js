const connection = require('../../config/connection');

const checkAlreadyBooked = (userId, eventId) => {
  const sql = {
    text: 'select * from user_event where user_id = $1 and event_id = $2',
    values: [userId, eventId],
  };
  return connection.query(sql);
};

module.exports = checkAlreadyBooked;
