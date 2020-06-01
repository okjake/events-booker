const connection = require('../../config/connection');

const signAttendanceSql = (userCode, eventId) => {
  const sql = {
    text:
      'update user_event set attendance = true where user_code = $1 and event_id = $2',
    values: [userCode, eventId],
  };
  return connection.query(sql);
};

module.exports = signAttendanceSql;
