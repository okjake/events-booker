const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const checkPassword = async (req, res, next) => {
  const hashPass = req.adminPassword;
  const { password } = req.body;
  try {
    const result = await bcrypt.compare(password, hashPass);
    if (result === false) {
      const err = new Error();
      err.msg = 'incorrect password';
      err.status = 403;
      throw err;
    } else {
      const token = jwt.sign({ id: req.adminId }, process.env.SECRET_KEY);
      res.cookie('token', token);
      res.json({ msg: 'logged in successfully' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = checkPassword;
