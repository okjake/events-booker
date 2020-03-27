const connection = require("../config/connection");

const getEvents = () => connection.query("SELECT * FROM events");

module.exports = getEvents;
