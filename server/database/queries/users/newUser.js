const connection = require('../../config/connection');

const newUser = (data) => connection.query({
  text: 'INSERT INTO users(first_name, last_name, email, mobile, location) VALUES ($1, $2, $3, $4, $5)',
  values: [data.firstName, data.lastName, data.email, data.mobile, data.location],
});

module.exports = newUser;
