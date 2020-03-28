const getAllEvents = require("../../../database/queries/getEvents");

const getEvents = (req, res) => {
  getAllEvents()
    .then(({ rows }) => res.json(rows))
    .catch(() => {
      res.status(400).json({ error: "Page Not Found" });
    });
};

module.exports = { getEvents };
