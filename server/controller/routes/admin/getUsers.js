const { getUsers } = require('../../../database/queries/users');

const getUsersData = (req, res, next) => {
  getUsers()
    .then(({ rows }) => res.json(rows))
    .catch(next);
};

module.exports = getUsersData;
