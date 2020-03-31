const connection = require('../../config/connection');

const userHasBooked = (userCode, eventId) => {
  const sql = {
    text: 'select * from user_event where user_code = $1 and event_id = $2',
    values: [userCode, eventId],
  };
  return connection.query(sql);
};

module.exports = userHasBooked;
