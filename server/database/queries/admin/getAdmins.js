const connection = require('../../config/connection');

const getAdminData = () => connection.query('SELECT * FROM admin');

module.exports = getAdminData;
