const connection = require('../../config/connection');

const createEventSql = ({
  title,
  eventCode,
  category,
  details,
  image,
  date,
  duration,
}) => {
  const sql = {
    text:
      'insert into events(title, event_code, category, details, image, date, duration) values($1, $2, $3, $4, $5, $6, $7)',
    values: [title, eventCode, category, details, image, date, duration],
  };
  return connection.query(sql);
};

module.exports = createEventSql;
