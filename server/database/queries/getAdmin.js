const connection = require('../config/connection');

const getAdmin = () => connection.query('SELECT * FROM admin');

module.exports = getAdmin;
