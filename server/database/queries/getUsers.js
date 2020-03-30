const connection = require('../config/connection');

const getUsers = () => connection.query('SELECT users.first_name, users.last_name, users.mobile, users.email, users.location FROM users');

module.exports = getUsers;
