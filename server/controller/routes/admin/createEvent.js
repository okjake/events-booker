const yup = require('yup');
const getEventDetalis = require('../../../database/queries/events');
const creatEventSql = require('../../../database/queries/events');


const validateEvent = (req, res, next) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    eventCode: yup
      .number()
      .required()
      .positive()
      .integer()
      .min(100)
      .max(999),
    category: yup.string().required(),
    details: yup.string().required(),
    image: yup
      .string()
      .url()
      .required(),
    date: yup.date().required(),
    duration: yup
      .number()
      .required()
      .positive()
      .integer(),
  });

  const result = schema.isValidSync(req.body);
  if (!result) {
    const err = new Error();
    err.msg = 'invalid inputs';
    err.status = 400;
    return next(err);
  }
  getEventDetalis(req.body.eventCode)
    .then(({ rows }) => {
      if (rows.length) {
        res.json({
          msg: `an event with code ${req.body.eventCode} already exist, try another code`,
        });
      } else next();
    })
    .catch(next);
};


const createEvent = (req, res, next) => {
  creatEventSql(req.body).then(() => res.json({ msg: `Event ${req.body.title} has been created successfully` })).catch(next);
};


module.exports = {
  validateEvent,
  createEvent,
};
