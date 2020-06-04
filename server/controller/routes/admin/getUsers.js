const { getUsers } = require('../../../database/queries/users');

const getUsersData = async (req, res, next) => {
  try {
    const { rows } = await getUsers();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = getUsersData;
