const { checkEmail } = require('../database/queries/admin');

const checkEmailIfExist = async (req, res, next) => {
  const { email } = req.body;
  try {
    const { rows } = await checkEmail(email);
    if (rows[0]) {
      req.adminPassword = rows[0].password;
      req.adminId = rows[0].id;
      next();
    } else {
      const error = new Error();
      error.msg = 'Email does not exist';
      error.status = 403;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = checkEmailIfExist;
