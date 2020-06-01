const connection = require('../../config/connection');

const checkEmail = (email) =>
  connection.query('SELECT * FROM admin WHERE email=$1', [email]);

module.exports = checkEmail;
