const connection = require('../../config/connection');

const newUser = ({
  firstName, lastName, email, mobile, location,
}) => connection.query({
  text: 'INSERT INTO users(first_name, last_name, email, mobile, location) VALUES ($1, $2, $3, $4, $5) returning *',
  values: [firstName, lastName, email, mobile, location],
});

module.exports = newUser;
