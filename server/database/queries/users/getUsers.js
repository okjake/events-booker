const connection = require('../../config/connection');

const getUsers = () =>
  connection.query(
    'SELECT first_name, last_name, mobile, email, location FROM users'
  );

module.exports = getUsers;
