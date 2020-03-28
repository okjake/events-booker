const getAllEvents = require("../../../database/queries/getEvents");

const getEvents = (req, res, next) => {
  getAllEvents()
    .then(({ rows }) => {
      if (rows.length) {
        res.json(rows);
      } else {
        const error = new Error();
        error.msg = "This page is not found";
        error.status = 400;
        next(error);
      }
    })
    .catch(next);
};

module.exports = { getEvents };
