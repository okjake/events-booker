const connection = require('../../config/connection');

const signUserAttend = (userId, eventId, userCode) => {
  const sql = {
    text:
      'insert into user_event(user_id, event_id, user_code) values($1, $2, $3)',
    values: [userId, eventId, userCode],
  };
  return connection.query(sql);
};

module.exports = signUserAttend;
