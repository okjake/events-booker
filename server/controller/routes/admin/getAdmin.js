const { getAdminData } = require('../../../database/queries/admin');

//Convert the promise to async and await 
const getAdmin = (req, res, next) => {
  getAdminData()
    .then(({ rows }) => res.json(rows))
    .catch(next);
}; 
};

module.exports = getAdmin;
