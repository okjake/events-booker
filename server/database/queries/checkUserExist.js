const connction = require('../config/connection');

module.exports = (mobileNum) => {
  const sql = {
    text: 'select * from users where mobile = $1',
    values: [mobileNum],
  };
  return connction.query(sql);
};
