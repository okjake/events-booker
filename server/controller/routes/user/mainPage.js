const getAllEvents = require("../../../database/queries/getEvents");

const getEvents = (req, res) => {
  getAllEvents()
    .then(({ rows }) => res.json(rows))
    .catch(err => console.error(err));
};

module.exports = { getEvents };
