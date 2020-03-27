const connection = require('../config/connection');

const cancelPopUp = (id) => connection.query('DELETE FROM user_event WHERE id=$1 RETURNING id', [id]);

module.exports = { cancelPopUp };
