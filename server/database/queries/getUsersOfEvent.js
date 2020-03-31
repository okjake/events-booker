const connection = require('../config/connection');

const getUsersOfEvent = (eventCode) => connection.query('SELECT users.first_name, users.last_name, users.mobile, users.email,users.location, user_event.attendance FROM users INNER JOIN user_event ON users.id = user_event.user_id INNER JOIN events ON user_event.event_id = events.id WHERE events.event_code = $1 ', [eventCode]);

module.exports = getUsersOfEvent;
