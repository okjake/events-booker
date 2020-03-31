const getUsers = require('../../../database/queries/users');

const getUsersData = (req, res, next) => {
  getUsers()
    .then(({ rows }) => {
      if (rows.length) {
        res.json(rows);
      } else {
        const error = new Error();
        error.msg = 'There is no users yet';
        error.status = 400;
        next(error);
      }
    })
    .catch(next);
};

module.exports = getUsersData;
