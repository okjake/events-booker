const connction = require('../config/connection');

const getUsersCode = (eventId) => {
  const sql = {
    text: 'select user_code from user_event where event_id = $1',
    values: [eventId],
  };
  return connction.query(sql);
};

module.exports = getUsersCode;
