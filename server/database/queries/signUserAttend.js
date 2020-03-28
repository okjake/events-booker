const connction = require('../config/connection');

module.exports = (userId, eventId, userCode) => {
  const sql = {
    text: 'insert into user_event(user_id, event_id, user_code) values($1, $2, $3)',
    values: [userId, eventId, userCode],
  };
  return connction.query(sql);
};
