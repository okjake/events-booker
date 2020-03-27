const connection = require('../config/connection');

const checkMobile = (data) => connection.query(`SELECT user_event.id
FROM user_event
JOIN users ON  users.id =user_event.user_id
JOIN events ON events.id = user_event.event_id
WHERE mobile=$1 AND event_code =$2`, [data.mobile, data.event_code]);

module.exports = checkMobile;
