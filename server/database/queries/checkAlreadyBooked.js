const connction = require('../config/connection');

module.exports = ({ id, eventId }) => {
  const sql = {
    text: 'select * from user_event where user_id = $1 and event_id = $2',
    values: [id, eventId],
  };
  return connction.query(sql);
};
