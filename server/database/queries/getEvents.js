const connection = require("../config/connection");

const getAllEvents = () => connection.query
("SELECT  events.title, events.category, events.event_code, events.details, events.image, events.date, events.duration, COUNT(user_event.event_id) 
AS Count 
FROM events 
LEFT JOIN user_event
ON (user_event.event_id = events.id)
WHERE events.expired = false
GROUP BY event_id,  events.title, events.category, events.event_code, events.details, events.image, events.date, events.duration;
);

module.exports = getAllEvents;
