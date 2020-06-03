const { getAdminData } = require('../../../database/queries/admin');

const getAdmin = async (req, res, next) => {
  try {
    const { rows } = await getAdminData();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = getAdmin;
