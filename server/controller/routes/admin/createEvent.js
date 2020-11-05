const yup = require('yup');

const { getEventDetails } = require('../../../database/queries/events');
const { createEventSql } = require('../../../database/queries/events');

const validateEvent = async (req, res, next) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    eventCode: yup.number().required().positive().integer().min(100).max(999),
    category: yup.string().required(),
    details: yup.string().required(),
    image: yup.string().url().required(),
    date: yup.date().required(),
    duration: yup.number().required().positive().integer(),
  });
  try {
    const result = await schema.isValid(req.body);
    if (!result) {
      const err = new Error();
      err.msg = 'invalid inputs';
      err.status = 400;
      throw err;
    }
    const { rows } = await getEventDetails(req.body.eventCode);
    if (rows.length) {
      const err = new Error();
      err.msg = `an event with code ${req.body.eventCode} already exist, try another code`;
      err.status = 400;
      throw err;
    } else next();
  } catch (error) {
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  try {
    await createEventSql(req.body);
    res.json({ msg: `Event ${req.body.title} has been created successfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateEvent,
  createEvent,
};
