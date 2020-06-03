const { getEventDetails } = require('../../../database/queries/events/index');

const getEventByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const {  rows    } = await getEventDetails(code);
    if (rows.length === 0) {
      const err = new Error();
      err.status = 404;
      err.msg = 'the event you are trying to book does not exist';
      throw err;
    } else {
      const [event] = rows;
      res.json(event);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getEventByCode;
