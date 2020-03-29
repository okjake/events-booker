const connction = require('../config/connection');

module.exports = (userCode, eventId) => {
  const sql = {
    text: 'update user_event set attendance = true where user_code = $1 and event_id = $2',
    values: [userCode, eventId],
  };
  return connction.query(sql);
};
