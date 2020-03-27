const checkMobile = require('../database/queries/checkMobile');

const checkMobileIfRegister = (req, res, next) => {
  const data = req.body;
  checkMobile(data).then((result) => {
    if (result.rows.length) {
      res.everUserId = result.rows.id;
      next();
    } else {
      const error = new Error();
      error.msg = 'mobile dosent register';
      error.status = 400;
      next(error);
    }
  }).catch(next);
};
module.exports = { checkMobileIfRegister };
