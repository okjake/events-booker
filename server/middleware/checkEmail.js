const { checkEmail } = require('../database/queries/admin');

const checkEmailIfExist = (req, res, next) => {
  const { email } = req.body;
  checkEmail(email)
    .then(({ rows }) => {
      if (rows[0]) {
        req.adminPassword = rows[0].password;
        req.adminId = rows[0].id;
        next();
      } else {
        const error = new Error();
        error.msg = 'email dosent exist';
        error.status = 403;
        throw error;
      }
    }).catch((err) => {
      next(err);
    });
};


module.exports = checkEmailIfExist;
