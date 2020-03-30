const connction = require('../config/connection');

module.exports = ({
  title, eventCode, category, details, image, date, duration,
}) => {
  const sql = {
    text: 'insert into events(title, event_code, category, details, image, date, duration) values($1, $2, $3, $4, $5, $6, $7)',
    values: [title, eventCode, category, details, image, date, duration],
  };
  return connction.query(sql);
};
