const connection = require('../../config/connection');

const getEventDetails = (eventCode) => {
  const sql = {
    text: 'select * from events where event_code = $1',
    values: [eventCode],
  };
  return connection.query(sql);
};

module.exports = getEventDetails;
