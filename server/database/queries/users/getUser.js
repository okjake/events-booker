const connection = require('../../config/connection');

const getUser = (email) =>
  connection.query({
    text: 'select * from users where email = $1',
    values: [email],
  });

module.exports = getUser;
