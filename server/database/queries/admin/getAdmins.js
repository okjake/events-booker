const connection = require('../../config/connection');

const getAdminData = () => connection.query('SELECT name,img FROM admin');

module.exports = getAdminData;
