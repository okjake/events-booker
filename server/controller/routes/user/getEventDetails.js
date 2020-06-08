const yup = require('yup');
const { getEventDetails } = require('../../../database/queries/events/index');

const schema = yup.object().shape({
  code: yup.number().required().positive().integer().min(100).max(999),
});

const getEventByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    await schema.validate({ code });
    const { rows } = await getEventDetails(code);
    if (rows.length === 0) {
      const err = new Error();
      err.status = 404;
      err.msg = `event with code ${code} doesn't exist`;
      throw err;
    } else {
      const [event] = rows;
      return res.json(event);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res
        .status(400)
        .json({ msg: 'event code must be a number of 3 digits' });
    }
    return next(err);
  }
};

module.exports = getEventByCode;
