const { getAdminData } = require('../../../database/queries/admin');

const getAdmin = (req, res, next) => {
  getAdminData()
    .then(({ rows }) => res.json(rows))
    .catch(next);
};
module.exports = getAdmin;
