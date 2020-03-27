const connection = require("../config/connection");

const getAllEvents = () => connection.query("SELECT * FROM events");

module.exports = getAllEvents;
