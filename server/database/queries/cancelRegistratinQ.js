const connection = require('../config/connection');

const cancelPopUp = (data) => connection.query(`DELETE FROM user_event
 WHERE id IN (SELECT user_event.id
     FROM user_event
     JOIN users ON  users.id =user_event.user_id
     JOIN events ON events.id = user_event.event_id
     WHERE mobile=$1 AND event_code =$2) RETURNING *`, [data.mobile, data.eventCode]);

module.exports = { cancelPopUp };
