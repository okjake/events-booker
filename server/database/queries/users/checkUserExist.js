const connection = require('../../config/connection');

const checkUserExit = (mobileNum) => {
  const sql = {
    text: 'select * from users where mobile = $1',
    values: [mobileNum],
  };
  return connection.query(sql);
};

module.exports = checkUserExit;
